import React from 'react';
import {
  ShieldAlert,
  MessageSquare,
  FileCheck,
  Camera,
  Calendar,
  Mail,
} from 'lucide-react';
import { CONTACT_INFO } from '../data/content';

export const ClaimMaintenancePage: React.FC = () => {
  const claimWhatsAppUrl = CONTACT_INFO.whatsappUrl;

  const handleClaimClick = () => {
    window.open(claimWhatsAppUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-16 lg:space-y-24 py-8 sm:py-12">
      {/* 1. Header / Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B45309] bg-amber-50/90 px-3.5 py-1.5 rounded-full border border-amber-200 shadow-xs">
          <img
            src="/assets/aistudio/rentibee_logo_transparent.png"
            alt="RentiBee"
            className="w-5 h-5 object-contain logo-bee-interactive shrink-0"
          />
          <span>Owner Protection & Damage Assistance</span>
        </div>

        {/* Exact H1 requested */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F1724] tracking-tight">
          Claim Maintenance
        </h1>

        {/* Exact eligibility copy requested */}
        <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed font-medium">
          If a maintenance issue was caused by our guest, claim the maintenance support and 20% maintenance coverage will be applied. Maintenance charges will be provided within 24-48 hours after invoice submission.
        </p>

        {/* Primary WhatsApp Claim Button */}
        <div className="pt-4">
          <button
            onClick={handleClaimClick}
            className="btn-shine px-9 py-4 rounded-xl font-bold text-slate-900 bg-[#FFB400] hover:bg-[#E5A200] active:scale-95 shadow-lg hover:shadow-xl transition-all text-base inline-flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FFB400]"
          >
            <MessageSquare className="w-5 h-5 text-slate-900" />
            <span>Claim Maintenance</span>
          </button>
          <div className="text-xs text-slate-500 mt-2">
            Opens dedicated WhatsApp support desk at {CONTACT_INFO.whatsappUrl}
          </div>
        </div>
      </section>

      {/* 2. Step-by-Step Instructions & Required Information */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div className="border-b border-slate-200 pb-6 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F1724]">
              What You Need to Claim 20% Maintenance Coverage
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              To ensure speedy approval and vendor dispatch, please have the following information ready when messaging our WhatsApp support team:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group bg-[#F7FAFC] rounded-2xl p-6 border border-slate-200 hover:border-[#FFB400]/60 hover-lift transition-all space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#FFB400]/15 text-[#B45309] flex items-center justify-center font-bold group-hover:scale-110 group-hover:bg-[#FFB400] group-hover:text-slate-900 transition-all duration-300">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-[#B45309] transition-colors">
                1. Stay Dates & Checkout
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provide the recent guest checkout date and the property address so our team can cross-reference the stay record.
              </p>
            </div>

            <div className="group bg-[#F7FAFC] rounded-2xl p-6 border border-slate-200 hover:border-[#FFB400]/60 hover-lift transition-all space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#FFB400]/15 text-[#B45309] flex items-center justify-center font-bold group-hover:scale-110 group-hover:bg-[#FFB400] group-hover:text-slate-900 transition-all duration-300">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-[#B45309] transition-colors">
                2. Guest Reference Code
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Include the booking reference from the checkout receipt sent to your email or WhatsApp upon guest departure.
              </p>
            </div>

            <div className="group bg-[#F7FAFC] rounded-2xl p-6 border border-slate-200 hover:border-[#FFB400]/60 hover-lift transition-all space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#FFB400]/15 text-[#B45309] flex items-center justify-center font-bold group-hover:scale-110 group-hover:bg-[#FFB400] group-hover:text-slate-900 transition-all duration-300">
                <Camera className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-[#B45309] transition-colors">
                3. Photos & Repair Invoice
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Attach clear smartphone photos of the affected fixture or item and your repair invoice. Maintenance charges will be provided within 24-48 hours after invoice submission.
              </p>
            </div>
          </div>

          {/* Quick Action Callout Box */}
          <div className="bg-[#F7FAFC] rounded-2xl p-6 sm:p-8 border border-slate-200 text-center space-y-4">
            <div className="max-w-xl mx-auto space-y-2">
              <h3 className="text-base font-bold text-slate-900">
                Ready to Submit Your Claim?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Tap below to open WhatsApp with our claims desk. Attach your damage photos and invoice. Maintenance charges will be provided within 24-48 hours after invoice submission.
              </p>
            </div>
            <div>
              <button
                onClick={handleClaimClick}
                className="btn-shine px-8 py-3.5 rounded-xl font-bold text-slate-900 bg-[#FFB400] hover:bg-[#E5A200] active:scale-95 shadow-md hover:shadow-lg transition-all text-sm inline-flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-slate-900" />
                <span>Claim Maintenance</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Coverage Policy Clarifications */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0F1724] text-center">
          How the 20% Maintenance Coverage Policy Operates
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-[#FFB400]/60 hover-lift transition-all space-y-2">
            <h3 className="font-bold text-slate-900">What Is Covered</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct damages or acute maintenance breakdowns resulting from guest stays, such as plumbing blockages caused by guests, broken door locks, damaged furnishings, appliance misusage, or broken kitchenware.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-[#FFB400]/60 hover-lift transition-all space-y-2">
            <h3 className="font-bold text-slate-900">Coverage Application & Settlement</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              RentiBee covers 20% of the maintenance repair invoice directly. Maintenance charges will be provided within 24-48 hours after invoice submission. The remaining balance can be settled from the guest damage deposit or deducted seamlessly from upcoming payout balances.
            </p>
          </div>
        </div>

        {/* Direct Email & WhatsApp Support Fallback */}
        <div className="text-center text-xs text-slate-500 pt-4">
          Need formal documentation or claim dispatch? Email our support desk at{' '}
          <a href={`mailto:${CONTACT_INFO.email}`} className="text-[#B45309] underline font-semibold">
            {CONTACT_INFO.email}
          </a>{' '}
          or chat with our claim desk on WhatsApp at{' '}
          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#B45309] underline font-semibold"
          >
            {CONTACT_INFO.whatsapp}
          </a>{' '}
          <span className="text-slate-500">· WhatsApp and Email support only</span>
        </div>
      </section>
    </div>
  );
};
