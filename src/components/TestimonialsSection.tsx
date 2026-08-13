import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Testimonial } from '../types';
import { Star, MessageSquarePlus, CheckCircle } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Testimonial[]>(TESTIMONIALS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newQuote, setNewQuote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newQuote) return;

    const initials = newName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const created: Testimonial = {
      id: `rev-user-${Date.now()}`,
      name: newName,
      role: newRole || 'Seamless Traveler',
      initials: initials || 'ST',
      colorClass: 'bg-white text-black',
      rating: 5,
      quote: `"${newQuote}"`
    };

    setReviewsList([created, ...reviewsList]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowAddModal(false);
      setNewName('');
      setNewRole('');
      setNewQuote('');
    }, 1200);
  };

  return (
    <section className="w-full py-20 px-6 md:px-12 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mb-16">
          <div className="text-[11px] uppercase tracking-[0.35em] font-bold text-white/50 mb-3">
            COMMUNITY REVIEWS
          </div>
          <h2 className="font-['Plus_Jakarta_Sans'] text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-4">
            WHAT TRAVELERS ARE <span className="text-[#3D3D3D]">RAVING ABOUT.</span>
          </h2>
          <p className="font-['Space_Grotesk'] text-sm md:text-base text-white/60">
            Over 1 million travelers plan their perfect trips with Seamless Travel.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 w-full">
          {reviewsList.map((rev) => (
            <div 
              key={rev.id}
              className="break-inside-avoid mb-6 bg-[#161616] p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all text-white"
            >
              {/* User Header */}
              <div className="flex items-center gap-3.5 mb-4">
                {rev.avatar ? (
                  <img 
                    src={rev.avatar} 
                    alt={rev.name}
                    className="w-10 h-10 rounded-full object-cover bg-white/10 border border-white/20" 
                  />
                ) : (
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs uppercase ${rev.colorClass || 'bg-white text-black'}`}>
                    {rev.initials || 'ST'}
                  </div>
                )}
                <div>
                  <div className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-white">
                    {rev.name}
                  </div>
                  <div className="text-xs font-mono text-white/50 mt-0.5">
                    {rev.role}
                  </div>
                </div>
              </div>

              {/* Star Rating */}
              {rev.rating && (
                <div className="flex gap-1 mb-3 text-white">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
              )}

              {/* Quote */}
              <p className="font-['Space_Grotesk'] text-sm text-white/80 leading-relaxed">
                {rev.quote}
              </p>
            </div>
          ))}
        </div>

        {/* Add Review Action */}
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-12 inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-full hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] cursor-pointer"
        >
          <MessageSquarePlus className="w-4 h-4 text-black" />
          <span>Share Your Story</span>
        </button>

      </div>

      {/* Submit Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161616] rounded-3xl max-w-md w-full p-8 border border-white/20 shadow-2xl text-white animate-in fade-in zoom-in duration-200">
            <h3 className="font-['Plus_Jakarta_Sans'] font-black text-xl uppercase tracking-tight text-white mb-1">
              SHARE YOUR EXPERIENCE
            </h3>
            <p className="text-xs text-white/60 mb-6 font-['Space_Grotesk']">
              Help other travelers discover the power of seamless planning.
            </p>

            {submitted ? (
              <div className="py-8 flex flex-col items-center text-center">
                <CheckCircle className="w-12 h-12 text-green-400 mb-3" />
                <div className="font-bold text-base uppercase tracking-wider text-white">Review Submitted!</div>
                <div className="text-xs text-white/60 mt-1">Your feedback has been added to the board.</div>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="flex flex-col gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-white/70 tracking-widest mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-3 text-sm bg-[#222222] border border-white/20 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-white/70 tracking-widest mb-1.5">Role or Tagline</label>
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="e.g. Backpacker @SarahTravels"
                    className="w-full px-4 py-3 text-sm bg-[#222222] border border-white/20 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-white/70 tracking-widest mb-1.5">Your Feedback *</label>
                  <textarea
                    required
                    rows={3}
                    value={newQuote}
                    onChange={(e) => setNewQuote(e.target.value)}
                    placeholder="What did you love about Seamless Travel?"
                    className="w-full px-4 py-3 text-sm bg-[#222222] border border-white/20 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-white text-black font-black text-xs uppercase tracking-wider rounded-full hover:bg-neutral-200"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
