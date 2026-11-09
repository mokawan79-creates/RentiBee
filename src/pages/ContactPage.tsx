import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  CheckCircle2,
  Send,
  Building,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { CONTACT_INFO, NEIGHBORHOODS } from '../data/content';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyAddress: '',
    neighborhood: 'DHA Defence (Phases 1 to 8)',
    message: '',
  });

  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedSummary, setSubmittedSummary] = useState<{
    name: string;
    email: string;
    phone: string;
    neighborhood: string;
  } | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'WhatsApp number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 8) {
      newErrors.phone = 'Please enter a complete phone or WhatsApp number';
    }
    if (!formData.neighborhood.trim()) {
      newErrors.neighborhood = 'Please select your city or region in Pakistan';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please include a brief message or inquiry details';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Send the six fields with exact mappings to the server endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          whatsapp: formData.phone,
          city: formData.neighborhood,
          propertyAddress: formData.propertyAddress,
          message: formData.message,
          website_hp: honeypot,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || 'Failed to submit inquiry. Please try again or contact us via WhatsApp.'
        );
      }

      // Preserve submission details for the success summary card
      setSubmittedSummary({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        neighborhood: formData.neighborhood.trim(),
      });

      // Clear the form fields upon successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyAddress: '',
        neighborhood: 'DHA Defence (Phases 1 to 8)',
        message: '',
      });
      setHoneypot('');
      setErrors({});
      setSubmitted(true);
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      // If submission fails, preserve the entered form data and display an error message
      setSubmitError(
        err.message || 'We could not submit your inquiry at this moment. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setSubmitError(null);
    setSubmittedSummary(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      propertyAddress: '',
      neighborhood: 'DHA Defence (Phases 1 to 8)',
      message: '',
    });
    setHoneypot('');
    setErrors({});
  };

  return (
    <div className="space-y-16 lg:space-y-24 py-8 sm:py-12">
      {/* 1. Header / Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 animate-fade-in-up">
        <div className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B45309] bg-amber-50/90 px-3.5 py-1.5 rounded-full border border-amber-200 shadow-xs">
          <img
            src="/assets/aistudio/rentibee_logo_transparent.png"
            alt="RentiBee"
            className="w-4 h-4 object-contain logo-bee-interactive shrink-0"
          />
          <span>All Over Pakistan · Property Management Inquiry</span>
        </div>

        {/* Exact H1 requested */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F1724] tracking-tight">
          Contact RentiBee
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Have questions about our 80/20 earnings split, payout timing, or listing your property across Pakistan? Our property advisory team is available via email and WhatsApp.
        </p>
      </section>

      {/* 2. Main Contact Grid (Contact Details & Form) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct channels & Lahore Map Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-[#0F1724]">
                Reach Our Pakistan Advisory Team
              </h2>

              <div className="space-y-4">
                {/* Email card */}
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-[#F7FAFC] border border-slate-200 hover:border-[#FFB400] hover-lift transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FFB400]/15 text-[#B45309] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#FFB400] group-hover:text-slate-900 transition-all duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Email Support Desk
                    </div>
                    <div className="text-base font-bold text-[#0F1724] mt-0.5 group-hover:text-[#B45309] transition-colors">
                      {CONTACT_INFO.email}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Prompt replies within 2 hours
                    </div>
                  </div>
                </a>

                {/* WhatsApp card */}
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 hover:border-emerald-400 hover-lift transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      WhatsApp Quick Chat
                    </div>
                    <div className="text-base font-bold text-emerald-950 mt-0.5">
                      Chat on WhatsApp ({CONTACT_INFO.whatsapp})
                    </div>
                    <div className="text-xs text-emerald-800 mt-0.5">
                      Available Monday to Sunday, 9 AM to 9 PM PKT
                    </div>
                  </div>
                </a>

                {/* WhatsApp & Email Exclusive Policy Card */}
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 space-y-1">
                  <div className="font-bold text-amber-950 flex items-center gap-1.5">
                    <span>Support Notice:</span>
                  </div>
                  <p className="leading-relaxed text-amber-900/90">
                    We offer only WhatsApp and Email support (no phone call support) to maintain verified written audit trails, instant photo and document exchanges, and fast response times for all owners.
                  </p>
                </div>
              </div>

              {/* Service Area Snapshot */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
                  <MapPin className="w-4 h-4 text-[#FFB400]" />
                  <span>Service Area: All Over Pakistan</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Actively managing short-term rentals in Islamabad, Rawalpindi, Lahore, Karachi, Murree, Galyat, and premier tourism hubs nationwide.
                </p>
              </div>
            </div>

            {/* Stylized Pakistan Operations Snapshot Card */}
            <div className="bg-[#0F1724] text-white rounded-3xl p-6 border border-slate-800 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#FFD166]" />
                  <h3 className="font-bold text-white text-sm">
                    Pakistan Operations Network
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  Active Coverage
                </span>
              </div>

              {/* Visual simulated city grid */}
              <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 text-xs space-y-2.5">
                <div className="flex items-center justify-between text-slate-300 border-b border-slate-800 pb-2">
                  <span>Islamabad & Rawalpindi</span>
                  <span className="text-[#FFD166] font-semibold">Active Coverage</span>
                </div>
                <div className="flex items-center justify-between text-slate-300 border-b border-slate-800 pb-2">
                  <span>Lahore (DHA, Gulberg & Cantt)</span>
                  <span className="text-[#FFD166] font-semibold">Active Coverage</span>
                </div>
                <div className="flex items-center justify-between text-slate-300 border-b border-slate-800 pb-2">
                  <span>Karachi (Clifton & DHA)</span>
                  <span className="text-[#FFD166] font-semibold">Active Coverage</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Murree, Galyat & Northern Belts</span>
                  <span className="text-[#FFD166] font-semibold">Active Coverage</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form with Validation */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
              {submitted ? (
                <div className="py-10 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-[#0F1724]">
                      Message Received
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      Thank you, {submittedSummary?.name || 'there'}. Your inquiry has been successfully sent and recorded. Our property management advisor will message you on WhatsApp or email shortly.
                    </p>
                  </div>

                  {submittedSummary && (
                    <div className="bg-[#F7FAFC] border border-slate-200 rounded-2xl p-5 text-left text-sm max-w-md mx-auto space-y-2 text-slate-700">
                      <div>
                        <span className="text-slate-500 font-medium">Name: </span>
                        <span className="font-semibold text-slate-900">{submittedSummary.name}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-medium">Email: </span>
                        <span className="font-semibold text-slate-900">{submittedSummary.email}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-medium">WhatsApp: </span>
                        <span className="font-semibold text-slate-900">{submittedSummary.phone}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-medium">City/Region: </span>
                        <span className="font-semibold text-slate-900">{submittedSummary.neighborhood}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <a
                      href={CONTACT_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat on WhatsApp Now</span>
                    </a>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Honeypot spam protection field (hidden from legitimate users) */}
                  <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                    <label htmlFor="website_hp">Leave this field blank</label>
                    <input
                      type="text"
                      id="website_hp"
                      name="website_hp"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Submission Error Banner */}
                  {submitError && (
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-sm flex items-start gap-3 animate-fade-in">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-bold text-red-900">Submission Notice</div>
                        <div className="text-xs text-red-700 mt-0.5 leading-relaxed">
                          {submitError}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border-b border-slate-200 pb-4 mb-2">
                    <h2 className="text-2xl font-bold text-[#0F1724]">
                      Send Us Your Property Inquiry
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Fill out the form below and we will contact you within a few hours to arrange a property evaluation.
                    </p>
                  </div>

                  {/* Name field */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Full Name <span className="text-red-500 text-[10px] font-normal lowercase">(required)</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tariq Mehmood"
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 transition-colors ${
                        errors.name
                          ? 'border-red-400 focus:ring-red-200'
                          : 'border-slate-300 focus:border-[#FFB400] focus:ring-[#FFB400]/20'
                      }`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                  </div>

                  {/* Email & Phone fields in grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-red-500 text-[10px] font-normal lowercase">(required)</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. name@example.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 transition-colors ${
                          errors.email
                            ? 'border-red-400 focus:ring-red-200'
                            : 'border-slate-300 focus:border-[#FFB400] focus:ring-[#FFB400]/20'
                        }`}
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        WhatsApp Number <span className="text-red-500 text-[10px] font-normal lowercase">(required)</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +92 300 1234567"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 transition-colors ${
                          errors.phone
                            ? 'border-red-400 focus:ring-red-200'
                            : 'border-slate-300 focus:border-[#FFB400] focus:ring-[#FFB400]/20'
                        }`}
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* City or Region */}
                  <div>
                    <label htmlFor="contact-neighborhood" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      City or Region in Pakistan
                    </label>
                    <select
                      id="contact-neighborhood"
                      value={formData.neighborhood}
                      onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/20"
                    >
                      {NEIGHBORHOODS.map((n) => (
                        <option key={n.id} value={n.name}>
                          {n.name}
                        </option>
                      ))}
                      <option value="Other Area in Pakistan">Other Area in Pakistan</option>
                    </select>
                  </div>

                  {/* Property Address (Optional) */}
                  <div>
                    <label htmlFor="contact-address" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Property Address (Optional)
                    </label>
                    <input
                      id="contact-address"
                      type="text"
                      value={formData.propertyAddress}
                      onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                      placeholder="e.g. Sector F-7 Islamabad or DHA Lahore or Clifton Karachi"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/20"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Message or Inquiry Details <span className="text-red-500 text-[10px] font-normal lowercase">(required)</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your property, whether it is furnished, and when you would like to begin hosting guests."
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 transition-colors ${
                        errors.message
                          ? 'border-red-400 focus:ring-red-200'
                          : 'border-slate-300 focus:border-[#FFB400] focus:ring-[#FFB400]/20'
                      }`}
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                  </div>

                  {/* Form Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-shine w-full py-4 px-6 rounded-xl font-bold text-slate-900 bg-[#FFB400] hover:bg-[#E5A200] active:scale-[0.98] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FFB400] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin text-slate-900" />
                          <span>Sending inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-500 text-center">
                    Submitting this form notifies our team at rentibee@gmail.com. No spam, no obligation.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
