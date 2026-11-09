import React, { useState } from 'react';
import {
  Globe,
  TrendingUp,
  Users,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  DollarSign,
  Calculator,
  MessageSquare,
} from 'lucide-react';
import { PageId } from '../types';
import { CONTACT_INFO } from '../data/content';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenListModal: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onOpenListModal }) => {
  const [nightlyRate, setNightlyRate] = useState<number>(14000); // PKR
  const [nightsBooked, setNightsBooked] = useState<number>(22);

  const grossMonthly = nightlyRate * nightsBooked;
  const ownerShare = Math.round(grossMonthly * 0.8);
  const managementFee = Math.round(grossMonthly * 0.2);

  return (
    <div className="space-y-20 lg:space-y-28 py-8 sm:py-12">
      {/* 1. Header / Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B45309] bg-amber-50/90 px-3.5 py-1.5 rounded-full border border-amber-200">
            <img
              src="/assets/aistudio/rentibee_logo_transparent.png"
              alt="RentiBee"
              className="w-4 h-4 object-contain logo-bee-interactive shrink-0"
            />
            <span>Comprehensive Real Estate Hospitality</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F1724] tracking-tight">
            Services for Property Owners
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
            We market your home on top short-term rental platforms, and advertise on different social media platforms. We manage bookings, guest-communication and send 80% of earnings to your account within 24-72 hours.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <a
              href={CONTACT_INFO.listPropertyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine px-8 py-3.5 rounded-xl font-bold text-slate-900 bg-[#FFB400] hover:bg-[#E5A200] active:scale-95 shadow-md hover:shadow-xl transition-all text-base inline-flex items-center justify-center"
            >
              List Your Property
            </a>
            <button
              onClick={() => {
                onNavigate('claim-maintenance');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-xl font-semibold text-[#0F1724] bg-white border border-slate-300 hover:bg-slate-50 active:scale-95 transition-all text-base"
            >
              Claim Maintenance
            </button>
          </div>
        </div>
      </section>

      {/* 2. Detailed Service Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1: Top Short-Term Rental Platforms */}
          <div className="group bg-white rounded-2xl p-7 border border-slate-200 shadow-xs space-y-4 hover:border-[#FFB400]/60 hover-lift transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#FFB400]/15 text-[#B45309] flex items-center justify-center font-bold group-hover:scale-110 group-hover:bg-[#FFB400] group-hover:text-slate-900 transition-all duration-300">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#B45309] transition-colors">
              Top Short-Term Rental Platforms
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We market your home on top short-term rental platforms, syncing availability seamlessly, managing rates, and fine-tuning listing titles and descriptions to dominate search results across Pakistan.
            </p>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#FFB400]" />
                <span>Multi-platform calendar synchronization</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#FFB400]" />
                <span>Search-optimized titles and guidebooks</span>
              </li>
            </ul>
          </div>

          {/* Service 2: Social Media Advertising */}
          <div className="group bg-white rounded-2xl p-7 border border-slate-200 shadow-xs space-y-4 hover:border-[#FFB400]/60 hover-lift transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#FFB400]/15 text-[#B45309] flex items-center justify-center font-bold group-hover:scale-110 group-hover:bg-[#FFB400] group-hover:text-slate-900 transition-all duration-300">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#B45309] transition-colors">
              Social Media Advertising Campaigns
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We advertise on different social media platforms with targeted ad funnels on Instagram, Facebook, and Meta networks specifically directed to overseas Pakistanis, wedding parties, and business visitors.
            </p>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#FFB400]" />
                <span>Targeted social media guest acquisition</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#FFB400]" />
                <span>High-converting video and photo ad creative</span>
              </li>
            </ul>
          </div>

          {/* Service 3: Bookings & Guest-Communication */}
          <div className="group bg-white rounded-2xl p-7 border border-slate-200 shadow-xs space-y-4 hover:border-[#FFB400]/60 hover-lift transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#FFB400]/15 text-[#B45309] flex items-center justify-center font-bold group-hover:scale-110 group-hover:bg-[#FFB400] group-hover:text-slate-900 transition-all duration-300">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#B45309] transition-colors">
              Bookings & Guest-Communication
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We manage all bookings and guest inquiries with rapid response times. We coordinate arrival logistics, provide stay support, and manage communications through departure.
            </p>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#FFB400]" />
                <span>Prompt guest messaging and stay support</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#FFB400]" />
                <span>End-to-end reservation and calendar management</span>
              </li>
            </ul>
          </div>

          {/* Service 4: Dynamic Pricing & Yield Management */}
          <div className="group bg-white rounded-2xl p-7 border border-slate-200 shadow-xs space-y-4 hover:border-[#FFB400]/60 hover-lift transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#FFB400]/15 text-[#B45309] flex items-center justify-center font-bold group-hover:scale-110 group-hover:bg-[#FFB400] group-hover:text-slate-900 transition-all duration-300">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#B45309] transition-colors">
              Dynamic Pricing & Yield Management
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Nightly rates fluctuate according to real-time regional demand drivers across Pakistan such as major conferences, cricket matches, Eid holidays, and seasonal tourism surges to maximize your total monthly return.
            </p>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#FFB400]" />
                <span>Daily algorithmic rate adjustments</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#FFB400]" />
                <span>Occupancy optimization without rate degradation</span>
              </li>
            </ul>
          </div>

          {/* Service 5: Fast 80% Payouts in 24-72 Hours */}
          <div className="group bg-white rounded-2xl p-7 border border-slate-200 shadow-xs space-y-4 hover:border-[#FFB400]/60 hover-lift transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#FFB400]/15 text-[#B45309] flex items-center justify-center font-bold group-hover:scale-110 group-hover:bg-[#FFB400] group-hover:text-slate-900 transition-all duration-300">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#B45309] transition-colors">
              80% Payouts in 24 to 72 Hours
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Owners receive 80 percent of each booking payout transferred directly into their Pakistani bank account within 24 to 72 hours of guest checkout, complete with transparent digital statements.
            </p>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#FFB400]" />
                <span>Fast bank transfers within 24-72 hours</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#FFB400]" />
                <span>Transparent statements with zero hidden fees</span>
              </li>
            </ul>
          </div>

          {/* Service 6: 20% Maintenance Charge Coverage */}
          <div className="group bg-white rounded-2xl p-7 border border-slate-200 shadow-xs space-y-4 hover:border-[#FFB400]/60 hover-lift transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#FFB400]/15 text-[#B45309] flex items-center justify-center font-bold group-hover:scale-110 group-hover:bg-[#FFB400] group-hover:text-slate-900 transition-all duration-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#B45309] transition-colors">
              20% Maintenance Charge Coverage
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              In the rare event that a guest causes accidental damage or a maintenance issue, RentiBee provides 20% maintenance coverage to help resolve the problem. Maintenance charges will be provided within 24-48 hours after invoice submission.
            </p>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#FFB400]" />
                <span>20 percent coverage on guest-caused repairs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#FFB400]" />
                <span>Charges provided in 24-48 hours post-invoice</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Payments & Policies Section (80/20 split, 24-72 hours, maintenance coverage) */}
      <section className="bg-white py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#B45309] mb-2">
              Transparent Economics
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F1724]">
              Payments, Split & Payout Policies
            </h2>
            <p className="text-base text-slate-600 mt-2">
              We operate on an aligned incentive model: we only succeed when your property produces strong earnings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F7FAFC] rounded-2xl p-6 border border-slate-200 hover:border-[#FFB400]/60 hover-lift transition-all space-y-3">
              <div className="text-3xl font-extrabold text-[#B45309]">80%</div>
              <h3 className="font-bold text-slate-900 text-lg">Owner Payout Split</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                You receive 80 percent of the booking amount for every completed stay. RentiBee retains 20 percent to cover comprehensive marketing, listing distribution, platform ad spend, and guest communication.
              </p>
            </div>

            <div className="bg-[#F7FAFC] rounded-2xl p-6 border border-slate-200 hover:border-[#FFB400]/60 hover-lift transition-all space-y-3">
              <div className="text-3xl font-extrabold text-[#0F1724]">24-72 Hours</div>
              <h3 className="font-bold text-slate-900 text-lg">Fast Payout Window</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                No waiting until the end of the month or quarter. Payouts are transferred directly into your Pakistani bank account within 24 to 72 hours following guest checkout, accompanied by an itemized statement.
              </p>
            </div>

            <div className="bg-[#F7FAFC] rounded-2xl p-6 border border-slate-200 hover:border-[#FFB400]/60 hover-lift transition-all space-y-3">
              <div className="text-3xl font-extrabold text-[#16A34A]">20%</div>
              <h3 className="font-bold text-slate-900 text-lg">Maintenance Coverage</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                If our guest causes damage or a maintenance issue, RentiBee provides 20% maintenance coverage to the owner to subsidize the repair. Maintenance charges will be provided within 24-48 hours after invoice submission via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Earnings & Commission Calculator */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F1724] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
          {/* Subtle ambient light */}
          <div className="absolute -top-12 -right-12 w-80 h-80 bg-[#FFB400]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2 relative z-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#FFD166]">
              <Calculator className="w-4 h-4 text-[#FFB400]" />
              <span>Interactive Revenue Calculator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Estimate Your Net Monthly Take-Home
            </h2>
            <p className="text-sm text-slate-300">
              Adjust the sliders based on your property anywhere in Pakistan to see your 80 percent owner earnings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Sliders */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span className="text-slate-300">Nightly Rate (PKR)</span>
                  <span className="text-[#FFD166] text-base font-bold">
                    PKR {nightlyRate.toLocaleString()} / night
                  </span>
                </div>
                <input
                  type="range"
                  min="8000"
                  max="35000"
                  step="1000"
                  value={nightlyRate}
                  onChange={(e) => setNightlyRate(Number(e.target.value))}
                  className="w-full accent-[#FFB400] h-2.5 bg-slate-800 rounded-lg cursor-pointer transition-all"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>PKR 8,000 (Studio / 1-Bed)</span>
                  <span>PKR 35,000 (Luxury Villa)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span className="text-slate-300">Booked Nights Per Month</span>
                  <span className="text-[#FFD166] text-base font-bold">{nightsBooked} nights</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="28"
                  step="1"
                  value={nightsBooked}
                  onChange={(e) => setNightsBooked(Number(e.target.value))}
                  className="w-full accent-[#FFB400] h-2.5 bg-slate-800 rounded-lg cursor-pointer transition-all"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>10 nights (Low Season)</span>
                  <span>28 nights (Peak Season)</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 space-y-1">
                <div className="font-semibold text-white">How Payouts Work:</div>
                <p>
                  You receive your 80% payout (PKR {ownerShare.toLocaleString()}) deposited directly into your bank within 24 to 72 hours of guest departure.
                </p>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-6 border border-slate-700 space-y-4 hover:border-[#FFB400]/40 transition-colors">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">
                  Estimated Gross Bookings
                </span>
                <span className="text-xl font-bold text-slate-200">
                  PKR {grossMonthly.toLocaleString()}
                </span>
              </div>

              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">
                  RentiBee Full Service Fee (20%)
                </span>
                <span className="text-sm font-medium text-slate-400">
                  PKR {managementFee.toLocaleString()}
                </span>
              </div>

              <div className="pt-1">
                <span className="text-xs text-[#FFD166] block uppercase tracking-wider font-bold">
                  Your 80% Net Monthly Payout
                </span>
                <span className="text-3xl font-black text-white block mt-0.5 tracking-tight">
                  PKR {ownerShare.toLocaleString()}
                </span>
                <span className="text-xs text-emerald-400 block mt-1 font-medium">
                  Transferred within 24-72 hours post-checkout
                </span>
              </div>

              <a
                href={CONTACT_INFO.listPropertyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine block text-center w-full mt-4 py-3.5 rounded-xl font-bold text-slate-900 bg-[#FFB400] hover:bg-[#E5A200] active:scale-95 shadow-md transition-all text-sm"
              >
                List Your Property
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm hover-lift space-y-4 max-w-3xl mx-auto transition-all">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1724]">
            Start Earning From Your Property in Pakistan Today
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            No upfront listing fees, no monthly retainer charges. Just 80% paid directly to your account within 24 to 72 hours.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <a
              href={CONTACT_INFO.listPropertyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine px-8 py-3.5 rounded-xl font-bold text-slate-900 bg-[#FFB400] hover:bg-[#E5A200] active:scale-95 shadow-md hover:shadow-xl transition-all text-base inline-flex items-center justify-center"
            >
              List Your Property
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
