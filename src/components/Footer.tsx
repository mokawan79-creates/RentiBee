import React from 'react';
import { Mail, MapPin, MessageSquare, Shield, Clock, CheckCircle } from 'lucide-react';
import { PageId } from '../types';
import { CONTACT_INFO, NEIGHBORHOODS } from '../data/content';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenListModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenListModal }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F1724] text-slate-300 pt-16 pb-28 md:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Pakistan Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-md border border-slate-700/80 hover:scale-105 transition-transform duration-300">
                <img
                  src="/assets/aistudio/rentibee_logo_transparent.png"
                  alt="RentiBee Logo"
                  className="w-9 h-9 object-contain"
                />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Renti<span className="text-[#FFB400]">Bee</span>
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              We market your home on top short-term rental platforms, and advertise on different social media platforms. We manage bookings, guest-communication and send 80% of earnings to your account within 24-72 hours.
            </p>

            {/* Trust badge highlights */}
            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#FFD166] shrink-0" />
                <span>80 percent owner payout sent within 24 to 72 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#FFD166] shrink-0" />
                <span>20% maintenance coverage (provided within 24-48 hours of invoice)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FFD166] shrink-0" />
                <span>Serving premier destinations all over Pakistan</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Services & Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('claim-maintenance')}
                  className="hover:text-white transition-colors text-left text-[#FFD166]"
                >
                  Claim Maintenance
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  About RentiBee
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faq')}
                  className="hover:text-white transition-colors text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('blog')}
                  className="hover:text-white transition-colors text-left"
                >
                  Blog & Market Trends
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Areas We Serve Across Pakistan */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Areas We Serve
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              {NEIGHBORHOODS.slice(0, 6).map((n) => (
                <li key={n.id} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB400] shrink-0" />
                  <span>{n.name}</span>
                </li>
              ))}
              <li className="text-slate-500 pt-1">
                and holiday destinations nationwide
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & WhatsApp */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Contact & Support
            </h3>
            <div className="space-y-3 text-sm">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-start gap-2.5 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#FFB400] mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-white">{CONTACT_INFO.email}</div>
                  <div className="text-xs text-slate-400">Customer Support Desk</div>
                </div>
              </a>

              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageSquare className="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" />
                <div>
                  <div className="font-medium text-white">WhatsApp Support</div>
                  <div className="text-xs text-slate-400">{CONTACT_INFO.whatsapp}</div>
                </div>
              </a>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 leading-snug">
                <span className="text-white font-semibold block mb-0.5">Support Channels:</span>
                We provide support exclusively via WhatsApp and Email (no phone call support).
              </div>

              <div className="pt-2">
                <a
                  href={CONTACT_INFO.listPropertyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine block w-full py-2.5 px-4 text-xs font-bold text-slate-900 bg-[#FFB400] hover:bg-[#E5A200] active:scale-95 rounded-xl shadow-sm hover:shadow-md transition-all text-center"
                >
                  List Your Property
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            Copyright 2026 RentiBee Property Management. All rights reserved. Serving property owners all over Pakistan.
          </p>
          <div className="flex items-center gap-6">
            <span>Service area: All Over Pakistan</span>
            <span>·</span>
            <span>English language interface</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
