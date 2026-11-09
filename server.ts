import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In development, dev server must run on port 3000 per AI Studio environment constraints
const PORT = process.env.NODE_ENV === 'production' && process.env.PORT
  ? parseInt(process.env.PORT, 10)
  : 3000;

const app = express();

// Parse JSON request bodies
app.use(express.json({ limit: '100kb' }));

// In-memory rate limiting: Map of IP -> array of request timestamps
const ipSubmissionTimestamps = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 8; // Max 8 inquiries per 10 minutes per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipSubmissionTimestamps.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (validTimestamps.length >= RATE_LIMIT_MAX) {
    ipSubmissionTimestamps.set(ip, validTimestamps);
    return true;
  }
  validTimestamps.push(now);
  ipSubmissionTimestamps.set(ip, validTimestamps);
  return false;
}

// Google Apps Script Web App URL from server environment or config
const GOOGLE_APPS_SCRIPT_URL =
  process.env.GOOGLE_APPS_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbzrDCwzy9XIgwxi-JkdHgtwmmcdlKdFtlJKGox4FdWO3CRzZqFhnWk0Y3vpAxgq33JC/exec';

/**
 * Health check endpoint
 */
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * POST /api/contact
 * Receives contact form submissions, validates data, enforces spam protection & rate limits,
 * and forwards the exact payload to Google Apps Script which saves it to Google Sheets.
 */
app.post('/api/contact', async (req: Request, res: Response): Promise<void> => {
  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    '127.0.0.1';

  // 1. Honeypot spam check
  const honeypot = req.body.website_hp || req.body.honeypot;
  if (honeypot && String(honeypot).trim() !== '') {
    // Silently succeed to trick bots without logging to Google Sheets
    res.json({ success: true, message: 'Inquiry received.' });
    return;
  }

  // 2. Rate limiting check
  if (isRateLimited(clientIp)) {
    res.status(429).json({
      success: false,
      error: 'Too many submissions from your address. Please wait a few minutes before trying again.',
    });
    return;
  }

  // 3. Server-side input validation
  const { fullName, email, whatsapp, city, propertyAddress, message } = req.body;

  if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
    res.status(400).json({ success: false, error: 'Full Name is required.' });
    return;
  }
  if (fullName.trim().length > 150) {
    res.status(400).json({ success: false, error: 'Full Name is too long.' });
    return;
  }

  if (
    !email ||
    typeof email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    res.status(400).json({ success: false, error: 'A valid Email Address is required.' });
    return;
  }
  if (email.trim().length > 150) {
    res.status(400).json({ success: false, error: 'Email Address is too long.' });
    return;
  }

  if (
    !whatsapp ||
    typeof whatsapp !== 'string' ||
    whatsapp.replace(/\D/g, '').length < 8
  ) {
    res.status(400).json({ success: false, error: 'A valid WhatsApp Number is required.' });
    return;
  }
  if (whatsapp.trim().length > 50) {
    res.status(400).json({ success: false, error: 'WhatsApp Number is too long.' });
    return;
  }

  if (!city || typeof city !== 'string' || !city.trim()) {
    res.status(400).json({ success: false, error: 'City or Region in Pakistan is required.' });
    return;
  }
  if (city.trim().length > 100) {
    res.status(400).json({ success: false, error: 'City name is too long.' });
    return;
  }

  if (!message || typeof message !== 'string' || !message.trim()) {
    res.status(400).json({ success: false, error: 'Message or Inquiry Details are required.' });
    return;
  }
  if (message.trim().length > 3000) {
    res.status(400).json({ success: false, error: 'Message is too long (maximum 3000 characters).' });
    return;
  }

  const safePropertyAddress =
    propertyAddress && typeof propertyAddress === 'string'
      ? propertyAddress.trim().slice(0, 250)
      : '';

  // 4. Exact JSON field mappings required by Google Apps Script:
  // - fullName → Full Name
  // - email → Email Address
  // - whatsapp → WhatsApp Number
  // - city → City or Region in Pakistan
  // - propertyAddress → Property Address
  // - message → Message or Inquiry Details
  const googlePayload = {
    fullName: fullName.trim(),
    email: email.trim(),
    whatsapp: whatsapp.trim(),
    city: city.trim(),
    propertyAddress: safePropertyAddress,
    message: message.trim(),
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

    const googleResponse = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(googlePayload),
      redirect: 'follow', // Automatically follows Google Apps Script 302 redirect
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!googleResponse.ok) {
      console.error(
        `Google Apps Script returned status ${googleResponse.status}: ${googleResponse.statusText}`
      );
      res.status(502).json({
        success: false,
        error: 'Unable to record your inquiry in the spreadsheet right now. Please try again.',
      });
      return;
    }

    const responseText = await googleResponse.text();
    let responseData: { success?: boolean; message?: string; error?: string } = {};

    try {
      responseData = JSON.parse(responseText);
    } catch {
      // If response is not JSON (e.g. text/html), check if it indicates success
      if (responseText.includes('success') || responseText.includes('Inquiry submitted')) {
        responseData = { success: true };
      }
    }

    if (responseData.success === false) {
      console.error('Google Apps Script returned failure:', responseData);
      res.status(502).json({
        success: false,
        error: responseData.error || 'Failed to store inquiry in spreadsheet.',
      });
      return;
    }

    res.json({
      success: true,
      message: responseData.message || 'Inquiry submitted and stored in spreadsheet successfully.',
    });
  } catch (error: any) {
    console.error('Error forwarding inquiry to Google Apps Script:', error);
    if (error.name === 'AbortError') {
      res.status(504).json({
        success: false,
        error: 'Connection to Google Sheets timed out. Please try again.',
      });
      return;
    }
    res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your inquiry.',
    });
  }
});

// Mount Vite middleware in development mode, serve static build in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
