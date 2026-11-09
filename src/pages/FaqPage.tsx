import React, { useState } from 'react';
import {
  ChevronDown,
  Search,
  HelpCircle,
  ShieldCheck,
  Clock,
  DollarSign,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import { FAQS, CONTACT_INFO } from '../data/content';
import { PageId } from '../types';

interface FaqPageProps {
  onOpenListModal: () => void;
  onNavigate: (page: PageId) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onOpenListModal, onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-2': true,
  });

  const categories = [
    'All',
    'Payouts & Split',
    'Maintenance & Coverage',
    'Onboarding',
    'General',
  ];

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 lg:space-y-20 py-8 sm:py-12">
      {/* 1. Hero / Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B45309] bg-amber-50/90 px-3.5 py-1.5 rounded-full border border-amber-200 shadow-xs">
          <img
            src="/assets/aistudio/rentibee_logo_transparent.png"
            alt="RentiBee"
            className="w-4 h-4 object-contain logo-bee-interactive shrink-0"
          />
          <span>Knowledge Base & Owner Policies</span>
        </div>

        {/* Exact H1 requested */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F1724] tracking-tight">
          Frequently Asked Questions
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Clear answers about how we manage your property across Pakistan, calculate your 80 percent earnings, deliver payouts within 24 to 72 hours, and handle maintenance coverage.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto pt-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (payout, maintenance, bookings)..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/20 shadow-xs transition-all"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold active:scale-95 transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#FFB400] text-slate-900 font-bold shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 2. FAQ Accordion List */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-sm text-slate-600">
              No questions found matching your search. Try adjusting keywords or contact us directly.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = !!openItems[faq.id];
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover-lift transition-all hover:border-[#FFB400]/60"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB400]"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-slate-900 text-base sm:text-lg">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 transition-transform duration-300 ease-out ${
                        isOpen ? 'rotate-180 bg-[#FFB400] text-slate-900' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#F7FAFC]/50 animate-fade-in">
                      <p>{faq.answer}</p>
                      <div className="mt-3 text-[11px] font-semibold text-[#B45309] uppercase tracking-wider">
                        Topic: {faq.category}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 3. Maintenance Claim Callout & CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F1724] text-white rounded-3xl p-8 sm:p-12 text-center space-y-5 shadow-xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#FFB400]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Have a Specific Question About Your Property?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
              Our property advisory team is always happy to review your property layout and discuss your expected earnings anywhere in Pakistan.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <a
                href={CONTACT_INFO.listPropertyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine px-8 py-3.5 rounded-xl font-bold text-slate-900 bg-[#FFB400] hover:bg-[#E5A200] active:scale-95 shadow-md hover:shadow-xl transition-all text-base inline-flex items-center gap-2"
              >
                <span>List Your Property</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => {
                  onNavigate('claim-maintenance');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 rounded-xl font-semibold text-white bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 transition-all text-base"
              >
                Claim Maintenance
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
