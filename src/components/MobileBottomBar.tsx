import React from 'react';
import { Mail, MessageSquare, PlusCircle } from 'lucide-react';
import { CONTACT_INFO } from '../data/content';

interface MobileBottomBarProps {
  onOpenListModal: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenListModal }) => {
  return (
    <aside aria-label="Mobile quick actions" className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl px-3 py-2">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Tap-to-WhatsApp */}
        <a
          href={CONTACT_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 transition-colors text-center active:scale-95"
          aria-label="Contact RentiBee via WhatsApp"
        >
          <MessageSquare className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight leading-tight">WhatsApp</span>
        </a>

        {/* Tap-to-Email */}
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors text-center active:scale-95"
          aria-label="Email RentiBee Support"
        >
          <Mail className="w-4 h-4 text-[#FFB400] mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight leading-tight">Email Support</span>
        </a>

        {/* Primary Action Button */}
        <a
          href={CONTACT_INFO.listPropertyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-[#FFB400] hover:bg-[#E5A200] text-slate-900 font-bold shadow-sm transition-colors text-center active:scale-95"
          aria-label="List Your Property"
        >
          <PlusCircle className="w-4 h-4 text-slate-900 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight leading-tight truncate w-full">List Property</span>
        </a>
      </div>
    </aside>
  );
};
