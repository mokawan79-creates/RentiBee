import React, { useState, useRef, useEffect } from 'react';
import {
  CheckCircle2,
  Clock,
  Shield,
  ArrowRight,
  TrendingUp,
  Globe,
  Users,
  DollarSign,
  AlertCircle,
  HelpCircle,
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
  Check,
  Building2,
  Sparkles,
} from 'lucide-react';
import { PageId } from '../types';
import { CONTACT_INFO, NEIGHBORHOODS, TESTIMONIALS, FAQS } from '../data/content';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenListModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenListModal }) => {
  const faqPreview = FAQS.slice(0, 4);

  // Reviews carousel state & swipe handling
  const reviewsContainerRef = useRef<HTMLDivElement>(null);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (!reviewsContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = reviewsContainerRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    // Calculate approximate active card index
    const children = reviewsContainerRef.current.children;
    let closestIndex = 0;
    let minDistance = Infinity;
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const distance = Math.abs(child.offsetLeft - reviewsContainerRef.current.offsetLeft - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }
    setActiveReviewIndex(closestIndex);
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, []);

  const scrollReviews = (direction: 'left' | 'right') => {
    if (!reviewsContainerRef.current) return;
    const container = reviewsContainerRef.current;
    const firstChild = container.firstElementChild as HTMLElement;
    const cardStep = firstChild ? firstChild.offsetWidth + 24 : container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -cardStep : cardStep,
      behavior: 'smooth',
    });
  };

  const scrollToReview = (index: number) => {
    if (!reviewsContainerRef.current) return;
    const container = reviewsContainerRef.current;
    const targetChild = container.children[index] as HTMLElement;
    if (targetChild) {
      container.scrollTo({
        left: targetChild.offsetLeft - container.offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  // Touch swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      scrollReviews('right');
    } else if (diff < -45) {
      scrollReviews('left');
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="space-y-20 lg:space-y-28">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-20 overflow-hidden">
        {/* Soft Ambient Floating Glow Effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-[#FFB400]/15 via-[#FFD166]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-float" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Service area badge with official RentiBee logo */}
              <div className="animate-fade-in-up inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-amber-200/90 shadow-xs text-xs font-semibold text-slate-800 backdrop-blur-xs">
                <img
                  src="/assets/aistudio/rentibee_logo_transparent.png"
                  alt="RentiBee Logo"
                  className="w-5 h-5 object-contain logo-bee-interactive shrink-0"
                />
                <span className="text-[#B45309] font-bold">RentiBee</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-700">Serving All Over Pakistan</span>
                <span className="hidden sm:inline text-slate-400">·</span>
                <span className="hidden sm:inline text-slate-500 font-normal">Short-Term Rental Specialists</span>
              </div>

              {/* Exact H1 requested with staggered entrance */}
              <h1 className="animate-fade-in-up delay-75 text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-[#0F1724] leading-[1.12]">
                List Your Property with RentiBee in Pakistan
              </h1>

              {/* Exact supporting sentence optimized per user instruction */}
              <p className="animate-fade-in-up delay-150 text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl font-medium">
                We market your home on top short-term rental platforms, and advertise on different social media platforms. We manage bookings, guest-communication and send 80% of earnings to your account within 24-72 hours.
              </p>

              {/* Key Trust Signals Strip highlighting the 4 core pillars with interactive hover lift */}
              <div className="animate-fade-in-up delay-200 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700">
                <div className="hover-lift group flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 hover:border-[#FFB400]/60 shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-[#FFB400]/10 flex items-center justify-center text-[#B45309] shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Globe className="w-4 h-4 text-[#FFB400]" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Top Platforms & Social Ads</span>
                    <span className="text-slate-600 text-[11px]">Syndication + targeted social campaigns</span>
                  </div>
                </div>

                <div className="hover-lift group flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 hover:border-[#FFB400]/60 shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-[#FFB400]/10 flex items-center justify-center text-[#B45309] shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-4 h-4 text-[#FFB400]" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Bookings & Guest-Communication</span>
                    <span className="text-slate-600 text-[11px]">24/7 guest messaging & key coordination</span>
                  </div>
                </div>

                <div className="hover-lift group flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 hover:border-[#FFB400]/60 shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-[#FFD166]/40 flex items-center justify-center text-slate-900 shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-4 h-4 text-[#B45309]" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">80% Earnings in 24-72 Hours</span>
                    <span className="text-slate-600 text-[11px]">Fast payouts transferred post-checkout</span>
                  </div>
                </div>

                <div className="hover-lift group flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 hover:border-[#FFB400]/60 shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-[#FFD166]/40 flex items-center justify-center text-slate-900 shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-4 h-4 text-[#B45309]" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">20% Maintenance Coverage</span>
                    <span className="text-slate-600 text-[11px]">Provided within 24-48 hours after invoice</span>
                  </div>
                </div>
              </div>

              {/* Primary & Secondary Action Buttons */}
              <div className="animate-fade-in-up delay-300 flex flex-wrap items-center gap-4 pt-3">
                <a
                  href={CONTACT_INFO.listPropertyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine px-7 py-3.5 rounded-xl font-bold text-slate-900 bg-[#FFB400] hover:bg-[#E5A200] active:bg-[#CC9000] shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FFB400] text-base inline-flex items-center gap-2"
                >
                  <span>List Your Property</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <button
                  onClick={() => {
                    onNavigate('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-7 py-3.5 rounded-xl font-semibold text-[#0F1724] bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 hover:-translate-y-0.5 transition-all text-base shadow-xs"
                >
                  See Our Services
                </button>
              </div>

              {/* Direct Support Snippet */}
              <p className="text-xs text-slate-600 pt-1">
                Prefer to message an advisor first? Reach us on WhatsApp at{' '}
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B45309] underline font-medium hover:text-[#92400E] transition-colors"
                >
                  {CONTACT_INFO.whatsapp}
                </a>{' '}
                or email{' '}
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-[#B45309] underline font-medium hover:text-[#92400E] transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>{' '}
                <span className="text-slate-500">(WhatsApp & Email support only)</span>
              </p>
            </div>

            {/* Right Media Hero Column */}
            <div className="lg:col-span-5 animate-fade-in delay-200">
              <div className="hover-lift relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group bg-slate-100">
                <img
                  src="/src/assets/images/hero_lahore_property_1793931647943.jpg"
                  alt="High-end furnished short-term rental living suite in Lahore with scenic balcony window"
                  className="w-full h-80 sm:h-96 lg:h-[460px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Floating top badge with official logo */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl py-1.5 px-3 border border-amber-200/80 shadow-md flex items-center gap-2 text-xs font-bold text-slate-900 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="/assets/aistudio/rentibee_logo_transparent.png"
                    alt="RentiBee"
                    className="w-5 h-5 object-contain logo-bee-interactive shrink-0"
                  />
                  <span>RentiBee Managed</span>
                </div>

                {/* Floating overlay trust card with smooth backdrop */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3.5 border border-slate-200/80 shadow-md flex items-center justify-between group-hover:border-[#FFB400]/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FFB400] text-slate-900 flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                      80%
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Direct Owner Earnings</div>
                      <div className="text-[11px] text-slate-600">Paid 24-72 hours after checkout</div>
                    </div>
                  </div>
                  <div className="text-right text-[11px] font-semibold text-slate-600">
                    All Over Pakistan
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM & SOLUTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#B45309] mb-2">
            The Smart Way to Rent in Pakistan
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F1724]">
            Why Pakistan Property Owners Choose RentiBee
          </h2>
          <p className="text-base text-slate-600 mt-3">
            Managing short-term rentals on your own consumes countless hours. Here is how we turn your property into predictable passive income.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Pain points card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-red-100 shadow-xs relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                The Hard Way: DIY Hosting
              </h3>
            </div>

            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                <span>
                  <strong>Constant Messaging:</strong> Answering late-night guest questions, coordinating key handovers in traffic, and dealing with cancellations.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                <span>
                  <strong>Single-Platform Dependency:</strong> Relying only on one app leaves your calendar empty during mid-week periods and quiet seasons.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                <span>
                  <strong>Unvetted Guests & Risk:</strong> Worrying about property damage, loud gatherings, or unverified guests without security procedures.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                <span>
                  <strong>Delayed Remittances:</strong> Struggling with international payout delays, exchange fees, and complex bookkeeping.
                </span>
              </li>
            </ul>
          </div>

          {/* Solution card */}
          <div className="bg-[#0F1724] text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#FFB400] text-slate-900 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">
                The RentiBee Solution
              </h3>
            </div>

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-[#FFD166] font-bold shrink-0 mt-0.5">✓</span>
                <span>
                  <strong className="text-white">Top Platforms & Social Media Advertising:</strong> We market your home on top short-term rental platforms and advertise on different social media channels to capture high-intent travelers.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFD166] font-bold shrink-0 mt-0.5">✓</span>
                <span>
                  <strong className="text-white">Full Bookings & Guest-Communication:</strong> We manage every inquiry, booking reservations, prompt guest messaging, and stay coordination.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFD166] font-bold shrink-0 mt-0.5">✓</span>
                <span>
                  <strong className="text-white">80% Earnings Sent in 24-72 Hours:</strong> Direct bank remittances sent straight to your account within 24 to 72 hours of guest checkout.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFD166] font-bold shrink-0 mt-0.5">✓</span>
                <span>
                  <strong className="text-white">20% Maintenance Coverage:</strong> If our guest causes damage, we cover 20 percent of maintenance costs provided within 24-48 hours after invoice submission with prompt WhatsApp claim support.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. KEY FEATURES / SERVICES */}
      <section className="bg-white py-16 sm:py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#B45309] mb-2">
              End-to-End Property Management
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F1724]">
              Everything Handled for You
            </h2>
            <p className="text-base text-slate-600 mt-3 max-w-2xl mx-auto">
              We market your home on top short-term rental platforms, and advertise on different social media platforms. We manage bookings, guest-communication and send 80% of earnings to your account within 24-72 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1: Top Short-Term Rental Platforms */}
            <div className="group bg-[#F7FAFC] rounded-2xl p-6 border border-slate-200 hover:border-[#FFB400]/60 hover-lift transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFB400]/15 text-[#B45309] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#FFB400] group-hover:text-slate-900 transition-all duration-300">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#B45309] transition-colors">
                Top Short-Term Rental Platforms
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We market your home on top short-term rental marketplaces with professional copy, synchronized calendars, and optimized ranking algorithms to maximize high-occupancy bookings.
              </p>
            </div>

            {/* Feature 2: Social Media Advertising */}
            <div className="group bg-[#F7FAFC] rounded-2xl p-6 border border-slate-200 hover:border-[#FFB400]/60 hover-lift transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFB400]/15 text-[#B45309] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#FFB400] group-hover:text-slate-900 transition-all duration-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#B45309] transition-colors">
                Social Media Advertising Campaigns
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We advertise on different social media platforms, running targeted visual campaigns across Instagram, Facebook, and Meta channels to attract overseas visitors, wedding groups, and corporate travelers.
              </p>
            </div>

            {/* Feature 3: Bookings & Guest-Communication */}
            <div className="group bg-[#F7FAFC] rounded-2xl p-6 border border-slate-200 hover:border-[#FFB400]/60 hover-lift transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFB400]/15 text-[#B45309] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#FFB400] group-hover:text-slate-900 transition-all duration-300">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#B45309] transition-colors">
                Bookings & Guest-Communication
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We manage all bookings and guest-communication. From prompt inquiry responses and reservation management to arrival coordination and checkout assistance, we handle every conversation.
              </p>
            </div>

            {/* Feature 4: Dynamic Pricing Guidance */}
            <div className="group bg-[#F7FAFC] rounded-2xl p-6 border border-slate-200 hover:border-[#FFB400]/60 hover-lift transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFB400]/15 text-[#B45309] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#FFB400] group-hover:text-slate-900 transition-all duration-300">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#B45309] transition-colors">
                Dynamic Pricing Guidance
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We continuously evaluate local travel patterns and seasonal market demand across Pakistan to optimize nightly rates for higher occupancy and maximized earnings.
              </p>
            </div>

            {/* Feature 5: 80% Earnings in 24-72 Hours */}
            <div className="group bg-[#F7FAFC] rounded-2xl p-6 border border-slate-200 hover:border-[#FFB400]/60 hover-lift transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFB400]/15 text-[#B45309] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#FFB400] group-hover:text-slate-900 transition-all duration-300">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#B45309] transition-colors">
                80% Earnings in 24-72 Hours
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Owners receive 80% of earnings sent directly to your account within 24 to 72 hours of guest checkout. Fully transparent accounting with zero hidden retainers or setup fees.
              </p>
            </div>

            {/* Feature 6: 20% Maintenance Coverage */}
            <div className="group bg-[#F7FAFC] rounded-2xl p-6 border border-slate-200 hover:border-[#FFB400]/60 hover-lift transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFB400]/15 text-[#B45309] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#FFB400] group-hover:text-slate-900 transition-all duration-300">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#B45309] transition-colors">
                20% Maintenance Coverage & Support
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                If a maintenance issue or damage is caused by our guest, we provide 20% maintenance coverage to the owner to subsidize repairs. Maintenance charges will be provided within 24-48 hours after invoice submission via our WhatsApp claim desk.
              </p>
            </div>
          </div>

          {/* Quick CTA inside features */}
          <div className="mt-12 text-center">
            <a
              href={CONTACT_INFO.listPropertyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-slate-900 bg-[#FFB400] hover:bg-[#E5A200] shadow-md hover:shadow-xl active:scale-95 transition-all text-base"
            >
              <span>List Your Property</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. AREAS WE SERVE ACROSS PAKISTAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#B45309] mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#FFB400]" />
              <span>Pakistan Destinations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F1724]">
              Areas We Serve Across Pakistan
            </h2>
            <p className="text-base text-slate-600 mt-2 max-w-xl">
              We specialize in top performing residential, corporate, and tourism destinations throughout Pakistan where short-term rental demand remains strong all year.
            </p>
          </div>

          <div className="shrink-0">
            <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs inline-block">
              Service Area: All Over Pakistan
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {NEIGHBORHOODS.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-[#FFB400] hover-lift transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-[#B45309] transition-colors">{item.name}</h3>
                </div>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {item.shortDesc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Avg Occupancy:</span>
                <span className="font-bold text-[#FFB400] group-hover:scale-105 transition-transform">{item.avgOccupancy}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. HOW IT WORKS (3-STEP PROCESS) */}
      <section className="bg-[#0F1724] text-white py-16 sm:py-24 relative overflow-hidden">
        {/* Subtle ambient light in dark section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FFB400]/5 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#FFD166] mb-2">
              Three Simple Steps
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              How RentiBee Works for Property Owners
            </h2>
            <p className="text-base text-slate-400 mt-3">
              Go from an idle property to effortless rental income with our hands-off onboarding process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="group bg-slate-900/80 rounded-2xl p-7 border border-slate-800 hover:border-[#FFB400]/60 hover-lift transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFB400] text-slate-900 flex items-center justify-center font-black text-xl group-hover:scale-110 group-hover:rotate-3 transition-transform">
                1
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-[#FFD166] transition-colors">
                Sign Up and List Your Property
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Submit your property details through our quick form. Our local property management team conducts a walkthrough, provides pricing advice, and prepares your property listing anywhere in Pakistan.
              </p>
              <div className="pt-2 text-xs text-[#FFD166] font-medium flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Zero upfront onboarding fees</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group bg-slate-900/80 rounded-2xl p-7 border border-slate-800 hover:border-[#FFB400]/60 hover-lift transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFB400] text-slate-900 flex items-center justify-center font-black text-xl group-hover:scale-110 group-hover:rotate-3 transition-transform">
                2
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-[#FFD166] transition-colors">
                We Market, Run Social Ads & Manage Bookings
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                We market your home on top short-term rental platforms, advertise on different social media channels, manage all bookings, and handle guest-communication from check-in to checkout.
              </p>
              <div className="pt-2 text-xs text-[#FFD166] font-medium flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Prompt guest-communication and booking care</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group bg-slate-900/80 rounded-2xl p-7 border border-slate-800 hover:border-[#FFB400]/60 hover-lift transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFB400] text-slate-900 flex items-center justify-center font-black text-xl group-hover:scale-110 group-hover:rotate-3 transition-transform">
                3
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-[#FFD166] transition-colors">
                Receive Payouts in 24 to 72 Hours
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Enjoy 80 percent of each booking payout remitted to your bank account within 24 to 72 hours of guest checkout. If guest damage occurs, 20 percent maintenance charges are provided within 24-48 hours after invoice submission.
              </p>
              <div className="pt-2 text-xs text-[#FFD166] font-medium flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Instant WhatsApp claim assistance</span>
              </div>
            </div>
          </div>

          <div className="mt-14 text-center">
            <a
              href={CONTACT_INFO.listPropertyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-slate-900 bg-[#FFB400] hover:bg-[#E5A200] shadow-lg hover:shadow-xl active:scale-95 transition-all text-base"
            >
              <span>List Your Property</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. SOCIAL PROOF / TRUST & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#B45309] mb-2">
              Verified Owner Experiences
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F1724]">
              Trusted by Property Owners Across Pakistan
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Real feedback from owners in Lahore, Islamabad, Karachi, Rawalpindi, Murree, and northern destinations enjoying passive short-term rental yields.
            </p>
          </div>

          {/* Swipe & Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <div className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Swipe left or right</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollReviews('left')}
                disabled={!canScrollLeft}
                aria-label="Previous review"
                className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all ${
                  canScrollLeft
                    ? 'bg-white border-slate-300 text-slate-800 hover:bg-[#FFB400] hover:text-slate-900 hover:border-[#FFB400] shadow-xs active:scale-95'
                    : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => scrollReviews('right')}
                disabled={!canScrollRight}
                aria-label="Next review"
                className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all ${
                  canScrollRight
                    ? 'bg-white border-slate-300 text-slate-800 hover:bg-[#FFB400] hover:text-slate-900 hover:border-[#FFB400] shadow-xs active:scale-95'
                    : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Swipeable Carousel Track */}
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <div
            ref={reviewsContainerRef}
            onScroll={updateScrollState}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 pb-6 no-scrollbar touch-pan-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="snap-start shrink-0 w-[85vw] sm:w-[400px] md:w-[380px] lg:w-[400px] bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6 select-text"
              >
                <div className="space-y-4">
                  {/* Rating & Verified badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#FFD166]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FFD166]" />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400">
                      5.0 Rating
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="font-bold text-slate-900 text-base">{t.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{t.location} · {t.propertyType}</div>
                  <div className="mt-3 text-xs font-semibold text-[#B45309] bg-[#FFB400]/10 px-3 py-1.5 rounded-lg inline-block">
                    {t.earningsGain}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots & Swipe Guidance */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToReview(idx)}
                aria-label={`Go to review ${idx + 1}`}
                className={`h-2.5 transition-all rounded-full ${
                  activeReviewIndex === idx
                    ? 'w-8 bg-[#FFB400]'
                    : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-medium text-slate-700">Review {activeReviewIndex + 1} of {TESTIMONIALS.length}</span>
            <span className="text-slate-300">·</span>
            <span className="inline-flex items-center gap-1 text-[#FFB400] font-medium">
              Swipe left or right to explore
            </span>
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FFD166]/30 text-slate-900 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-[#FFB400]" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                The RentiBee Owner Guarantee
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                80% owner earnings transferred within 24 to 72 hours of guest departure, backed by 20% maintenance coverage provided within 24-48 hours after invoice submission for any guest-caused damage.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              onNavigate('claim-maintenance');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="shrink-0 px-5 py-2.5 rounded-xl text-xs font-bold text-[#0F1724] bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            How Claims Work
          </button>
        </div>
      </section>

      {/* 7. FAQ PREVIEW */}
      <section className="bg-white py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#B45309] mb-2">
              Common Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1724]">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Everything you need to know about our 80/20 split, payout schedule, and maintenance coverage.
            </p>
          </div>

          <div className="space-y-4">
            {faqPreview.map((item) => (
              <div
                key={item.id}
                className="group p-5 rounded-xl border border-slate-200 bg-[#F7FAFC] hover:border-[#FFB400]/60 hover-lift transition-all"
              >
                <h3 className="font-bold text-slate-900 group-hover:text-[#B45309] text-sm sm:text-base mb-2 transition-colors">
                  {item.question}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => {
                onNavigate('faq');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B45309] hover:text-[#92400E] hover:underline transition-colors"
            >
              <span>View all questions and answers</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. FINAL FULL-WIDTH CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-[#0F1724] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl text-center space-y-6">
          {/* Ambient luminous glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FFB400]/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#FFB400]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold uppercase tracking-wider text-[#FFD166] shadow-sm">
              <img
                src="/assets/aistudio/rentibee_logo_transparent.png"
                alt="RentiBee Logo"
                className="w-4 h-4 object-contain logo-bee-interactive shrink-0"
              />
              <span>All Over Pakistan · Property Partner</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready to earn from your property in Pakistan?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              We market your home on top short-term rental platforms, and advertise on different social media platforms. We manage bookings, guest-communication and send 80% of earnings to your account within 24-72 hours.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href={CONTACT_INFO.listPropertyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine px-8 py-4 rounded-xl font-bold text-slate-900 bg-[#FFB400] hover:bg-[#E5A200] active:scale-95 shadow-lg hover:shadow-2xl transition-all text-base inline-flex items-center justify-center"
              >
                List Your Property
              </a>

              <button
                onClick={() => {
                  onNavigate('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-xl font-semibold text-white bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 hover:border-slate-600 transition-all text-base"
              >
                See Our Services
              </button>
            </div>

            <div className="text-xs text-slate-400 pt-3">
              Direct consultation via WhatsApp at{' '}
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFD166] underline font-medium"
              >
                {CONTACT_INFO.whatsapp}
              </a>{' '}
              or email{' '}
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-[#FFD166] underline font-medium"
              >
                {CONTACT_INFO.email}
              </a>{' '}
              <span className="text-slate-400">· WhatsApp & Email support only</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
