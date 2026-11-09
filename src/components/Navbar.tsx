import React, { useState } from 'react';
import { Menu, X, Home, Mail, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import { PageId } from '../types';
import { CONTACT_INFO } from '../data/content';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenListModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenListModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'claim-maintenance', label: 'Claim Maintenance' },
    { id: 'about', label: 'About' },
    { id: 'faq', label: 'FAQ' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4 lg:gap-8">
          {/* Zone 1: Brand Wordmark with Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB400] rounded-xl p-1 transition-transform"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50/90 border border-amber-200/80 p-1.5 flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:shadow-md group-hover:border-[#FFB400] transition-all duration-300">
              <img
                src="/assets/aistudio/rentibee_logo_transparent.png"
                alt="RentiBee Logo"
                className="w-9 h-9 object-contain logo-bee-interactive"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-[#0F1724]">
                  Renti<span className="text-[#FFB400]">Bee</span>
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold leading-none">
                Pakistan Rentals
              </p>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`py-2 text-sm whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB400] rounded-md ${
                  currentPage === link.id
                    ? 'text-[#B45309] font-bold border-b-2 border-[#FFB400]'
                    : 'text-slate-600 hover:text-[#0F1724]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action (Desktop) + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={CONTACT_INFO.listPropertyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-slate-900 bg-[#FFB400] hover:bg-[#E5A200] active:scale-95 rounded-xl shadow-sm hover:shadow-md transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FFB400]"
            >
              List Your Property
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:text-[#0F1724] hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB400]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1 mb-5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors flex items-center justify-between ${
                  currentPage === link.id
                    ? 'bg-[#FFB400]/15 text-[#B45309] font-bold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#0F1724]'
                }`}
              >
                <span>{link.label}</span>
                {currentPage === link.id && <ArrowRight className="w-4 h-4 text-[#FFB400]" />}
              </button>
            ))}
          </div>

          {/* Primary Action Button inside Mobile Menu */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <a
              href={CONTACT_INFO.listPropertyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 text-base font-bold text-slate-900 bg-[#FFB400] hover:bg-[#E5A200] rounded-xl shadow transition-colors"
            >
              List Your Property
            </a>

            {/* Direct Contact Links in Mobile Menu - WhatsApp & Email Only */}
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-800"
              >
                <Mail className="w-4 h-4 text-[#FFB400] shrink-0" />
                <span className="truncate">Email Us</span>
              </a>
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-900 font-medium"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="text-center text-[11px] text-slate-500 pt-1">
              <span className="font-medium text-slate-700">WhatsApp & Email Support Only</span>
              <span className="mx-2">·</span>
              <span>All Over Pakistan</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
