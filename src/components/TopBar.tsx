import React from 'react';
import { Mail, MapPin, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../data/content';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-[#0F1724] text-white text-xs py-2 px-4 sm:px-6 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Service area highlight */}
        <div className="flex items-center gap-2 text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-[#FFD166] shrink-0" />
          <span className="font-medium text-white">Serving {CONTACT_INFO.serviceArea}</span>
          <span className="hidden sm:inline text-slate-500">·</span>
          <span className="hidden sm:inline text-slate-400">Short-Term Rental Management & Marketing</span>
        </div>

        {/* Contact info - WhatsApp & Email Support Only */}
        <div className="flex items-center gap-3 sm:gap-5">
          <span className="hidden lg:inline text-[11px] text-slate-400 font-medium">
            WhatsApp & Email Support Only
          </span>

          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            title="Email RentiBee Customer Support"
          >
            <Mail className="w-3.5 h-3.5 text-[#FFB400] shrink-0" />
            <span className="font-medium">{CONTACT_INFO.email}</span>
          </a>

          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#FFD166] hover:text-[#F4C453] transition-colors font-medium"
            title="Chat with RentiBee on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5 shrink-0 text-[#FFD166]" />
            <span>WhatsApp: {CONTACT_INFO.whatsapp}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
