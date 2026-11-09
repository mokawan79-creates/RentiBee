import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { ListPropertyModal } from './components/ListPropertyModal';
import { CONTACT_INFO } from './data/content';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ClaimMaintenancePage } from './pages/ClaimMaintenancePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { BlogPage } from './pages/BlogPage';

import { ArrowUp } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isListModalOpen, setIsListModalOpen] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Track window scroll progress for top indicator & back to top visibility
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      setScrollProgress(currentProgress);
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update dynamic page titles & meta descriptions per page for enhanced SEO
  useEffect(() => {
    const pageMetaMap: Record<PageId, { title: string; desc: string }> = {
      home: {
        title: 'RentiBee – List Your Property Across Pakistan | Short-Term Rental Management',
        desc: 'We market your home on top short-term rental platforms, and advertise on different social media platforms. We manage bookings, guest-communication and send 80% of earnings to your account within 24-72 hours. Serving all over Pakistan.',
      },
      services: {
        title: 'Services for Property Owners – RentiBee Pakistan',
        desc: 'We market your home across top platforms and run social media ads. We manage bookings, guest-communication and send 80% of earnings within 24-72 hours. Nationwide property management in Pakistan.',
      },
      'claim-maintenance': {
        title: 'Claim Maintenance – 20% Coverage Support | RentiBee Pakistan',
        desc: 'Submit a guest damage claim under RentiBee 20% maintenance coverage policy via WhatsApp. Maintenance charges provided within 24-48 hours after invoice submission.',
      },
      about: {
        title: 'About RentiBee – Pakistan Real Estate Hospitality Specialists',
        desc: 'Learn about RentiBee mission and owner-first commitment to transparent 80/20 payouts within 24-72 hours for properties all over Pakistan.',
      },
      contact: {
        title: 'Contact RentiBee – Pakistan Property Management & Advisory',
        desc: 'Get in touch with RentiBee property specialists via WhatsApp at +92 3287738417 or email rentibee@gmail.com. Dedicated WhatsApp and Email support for properties across Pakistan.',
      },
      faq: {
        title: 'Frequently Asked Questions – Payouts & Policies | RentiBee',
        desc: 'Find answers about RentiBee 80/20 payout structure, 24-72 hour settlement timeline, and listing procedures across Pakistan.',
      },
      blog: {
        title: 'From the RentiBee Blog – Pakistan Rental Market Insights',
        desc: 'Read expert advice on maximizing short-term rental yields in Islamabad, Lahore, Karachi, and holiday destinations across Pakistan.',
      },
    };

    const currentMeta = pageMetaMap[currentPage] || pageMetaMap.home;
    document.title = currentMeta.title;

    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute('content', currentMeta.desc);
    }
  }, [currentPage]);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenListModal = () => {
    window.open(CONTACT_INFO.listPropertyUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCloseListModal = () => {
    setIsListModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC] text-[#0F1724] relative">
      {/* Top Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-1 bg-[#FFB400] z-50 pointer-events-none transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Top Bar with email and phone */}
      <TopBar />

      {/* Main sticky navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenListModal={handleOpenListModal}
      />

      {/* Main Content View with fade transition */}
      <main className="flex-1 animate-fade-in">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} onOpenListModal={handleOpenListModal} />
        )}
        {currentPage === 'services' && (
          <ServicesPage onNavigate={handleNavigate} onOpenListModal={handleOpenListModal} />
        )}
        {currentPage === 'claim-maintenance' && <ClaimMaintenancePage />}
        {currentPage === 'about' && (
          <AboutPage onOpenListModal={handleOpenListModal} />
        )}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'faq' && (
          <FaqPage onOpenListModal={handleOpenListModal} onNavigate={handleNavigate} />
        )}
        {currentPage === 'blog' && (
          <BlogPage onOpenListModal={handleOpenListModal} onNavigate={handleNavigate} />
        )}
      </main>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-20 sm:bottom-8 right-5 z-40 w-11 h-11 rounded-full bg-[#FFB400] hover:bg-[#E5A200] active:scale-95 text-slate-900 shadow-xl flex items-center justify-center transition-all animate-fade-in border border-amber-300"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}

      {/* Footer */}
      <Footer onNavigate={handleNavigate} onOpenListModal={handleOpenListModal} />

      {/* Persistent Mobile Bottom Bar */}
      <MobileBottomBar onOpenListModal={handleOpenListModal} />

      {/* Onboarding / Property Listing Modal */}
      <ListPropertyModal
        isOpen={isListModalOpen}
        onClose={handleCloseListModal}
      />
    </div>
  );
}
