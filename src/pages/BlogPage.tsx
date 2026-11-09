import React, { useState } from 'react';
import { BookOpen, Clock, User, ArrowRight, X, ChevronRight, Share2 } from 'lucide-react';
import { BLOG_POSTS, CONTACT_INFO } from '../data/content';
import { BlogPost, PageId } from '../types';

interface BlogPageProps {
  onOpenListModal: () => void;
  onNavigate: (page: PageId) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onOpenListModal, onNavigate }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="space-y-16 lg:space-y-20 py-8 sm:py-12">
      {/* 1. Header / Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B45309] bg-amber-50/90 px-3.5 py-1.5 rounded-full border border-amber-200 shadow-xs">
          <img
            src="/assets/aistudio/rentibee_logo_transparent.png"
            alt="RentiBee"
            className="w-4 h-4 object-contain logo-bee-interactive shrink-0"
          />
          <span>Market Insights & Hosting Knowledge</span>
        </div>

        {/* Exact H1 requested */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F1724] tracking-tight">
          From the RentiBee Blog
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Expert articles on maximizing rental yields across Pakistan, owner payout dynamics, property setup tips, and hospitality trends across Islamabad, Lahore, Karachi, and hill-station hubs.
        </p>
      </section>

      {/* 2. Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover-lift hover:border-[#FFB400]/60 transition-all flex flex-col justify-between"
            >
              <div className="p-6 sm:p-7 space-y-4">
                {/* Clean unboxed metadata with bullet separators (frontend design constitution) */}
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-[#B45309]">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.date}</span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#B45309] transition-colors leading-snug">
                  {post.title}
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="p-6 sm:p-7 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
                <span className="text-xs text-slate-500 font-medium">
                  By {post.author}
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedPost(post)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B45309] hover:underline"
                >
                  <span>Read Article</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. CTA Box */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F1724] text-white rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#FFB400]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Put These Real Estate Insights to Work
            </h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              Ready to convert your property into hands-off income? We manage the entire listing, marketing, and guest stay process for you.
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
        </div>
      </section>

      {/* Full Article Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl relative my-8 border border-slate-200 animate-fade-in-up">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-[#B45309]">{selectedPost.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedPost.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedPost.date}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1724] leading-tight">
                {selectedPost.title}
              </h2>

              <div className="text-xs text-slate-500 pb-2 border-b border-slate-100">
                Published by {selectedPost.author}
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed pt-2 max-h-[55vh] overflow-y-auto pr-2">
                {selectedPost.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <a
                  href={CONTACT_INFO.listPropertyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSelectedPost(null)}
                  className="btn-shine px-6 py-2.5 rounded-xl font-bold text-slate-900 bg-[#FFB400] hover:bg-[#E5A200] active:scale-95 text-xs transition-colors inline-flex items-center justify-center"
                >
                  List Your Property
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 active:scale-95 border border-slate-200 transition-colors"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
