import React from 'react';
import {
  Heart,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { CONTACT_INFO } from '../data/content';

interface AboutPageProps {
  onOpenListModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenListModal }) => {
  return (
    <div className="space-y-20 lg:space-y-28 py-8 sm:py-12">
      {/* 1. Hero / Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B45309] bg-amber-50/90 px-3.5 py-1.5 rounded-full border border-amber-200 shadow-xs">
              <img
                src="/assets/aistudio/rentibee_logo_transparent.png"
                alt="RentiBee"
                className="w-4 h-4 object-contain logo-bee-interactive shrink-0"
              />
              <span>Dedicated to Property Owners Across Pakistan</span>
            </div>

            {/* Exact H1 requested */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F1724] tracking-tight">
              About RentiBee
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              RentiBee was founded to solve a major headache for property owners across Pakistan: unlocking the remarkable earning potential of short-term rentals without having to deal with midnight guest messages, erratic cleaners, or slow payment cycles.
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              We market your home on top short-term rental platforms, and advertise on different social media platforms. We manage bookings, guest-communication and send 80% of earnings to your account within 24-72 hours.
            </p>

            <div className="pt-2">
              <a
                href={CONTACT_INFO.listPropertyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine px-8 py-3.5 rounded-xl font-bold text-slate-900 bg-[#FFB400] hover:bg-[#E5A200] active:scale-95 shadow-md hover:shadow-xl transition-all text-base inline-flex items-center gap-2"
              >
                <span>List Your Property</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="group relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 hover-lift">
              <img
                src="/src/assets/images/about_team_hosts_1793931649064.jpg"
                alt="RentiBee hospitality team consulting with an owner over property floor plans in Pakistan"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-slate-200 shadow-sm text-xs text-slate-800 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#FFB400] shrink-0" />
                <span>Hospitality specialists and field coordinators active across Pakistan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Values */}
      <section className="bg-white py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#B45309]">
              What Drives Us
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F1724]">
              Our Core Principles
            </h2>
            <p className="text-sm text-slate-600">
              We operate on genuine respect for owners, transparency in accounting, and authentic Pakistani hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="group bg-[#F7FAFC] rounded-2xl p-7 border border-slate-200 hover:border-[#FFB400]/60 hover-lift transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFB400]/15 text-[#B45309] flex items-center justify-center font-bold group-hover:scale-110 group-hover:bg-[#FFB400] group-hover:text-slate-900 transition-all duration-300">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#B45309] transition-colors">
                Owner-First Partnership
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your asset is your pride. We treat every home as if it were our own. We never force complicated portal dashboards on you; instead, we communicate directly, respectfully, and proactively.
              </p>
            </div>

            {/* Value 2 */}
            <div className="group bg-[#F7FAFC] rounded-2xl p-7 border border-slate-200 hover:border-[#FFB400]/60 hover-lift transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFB400]/15 text-[#B45309] flex items-center justify-center font-bold group-hover:scale-110 group-hover:bg-[#FFB400] group-hover:text-slate-900 transition-all duration-300">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#B45309] transition-colors">
                Radical Payout Transparency
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                No waiting months to receive what is rightfully yours. We remit 80 percent of earnings directly into your bank account within 24 to 72 hours of guest departure with zero hidden deductions.
              </p>
            </div>

            {/* Value 3 */}
            <div className="group bg-[#F7FAFC] rounded-2xl p-7 border border-slate-200 hover:border-[#FFB400]/60 hover-lift transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFB400]/15 text-[#B45309] flex items-center justify-center font-bold group-hover:scale-110 group-hover:bg-[#FFB400] group-hover:text-slate-900 transition-all duration-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#B45309] transition-colors">
                Comprehensive Property Protection
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Through dedicated guest-communication, active booking coordination, and our 20 percent maintenance coverage for guest-caused damages provided within 24 to 48 hours after invoice submission, we safeguard your home against unexpected repair costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Nationwide Presence & Trust Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F1724] text-white rounded-3xl p-8 sm:p-12 lg:p-16 text-center space-y-6 shadow-xl relative overflow-hidden">
          {/* Subtle ambient light */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#FFB400]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              Proudly Serving All Over Pakistan
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              From Islamabad and Lahore to Karachi, Murree, and northern holiday retreats, our field coordinators, inspection specialists, and local support networks deliver reliable hospitality standards nationwide.
            </p>
            <div className="pt-2">
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
        </div>
      </section>
    </div>
  );
};
