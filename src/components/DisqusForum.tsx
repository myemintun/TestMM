import React, { useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

declare global {
  interface Window {
    DISQUS?: {
      reset: (options: { reload: boolean; config?: () => void }) => void;
    };
  }
}

export const DisqusForum: React.FC = () => {
  useEffect(() => {
    // Inject Disqus embed script
    const existingScript = document.querySelector(
      'script[src="https://agentic-ai-mnm.disqus.com/embed.js"]'
    );

    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: function (this: { page: { url: string; identifier: string } }) {
          this.page.url = window.location.href;
          this.page.identifier = window.location.pathname;
        },
      });
    } else if (!existingScript) {
      const d = document;
      const s = d.createElement('script');
      s.src = 'https://agentic-ai-mnm.disqus.com/embed.js';
      s.setAttribute('data-timestamp', (+new Date()).toString());
      (d.head || d.body).appendChild(s);
    }

    // Inject Disqus count script
    const existingCountScript = document.getElementById('dsq-count-scr');
    if (!existingCountScript) {
      const countScript = document.createElement('script');
      countScript.id = 'dsq-count-scr';
      countScript.src = '//agentic-ai-mnm.disqus.com/count.js';
      countScript.async = true;
      (document.head || document.body).appendChild(countScript);
    }
  }, []);

  return (
    <section className="w-full py-16 px-6 md:px-12 bg-[#0F0F0F] border-t border-white/10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 text-white border border-white/20 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-white" />
            <span>Community Forum</span>
          </div>
          <h2 className="font-['Plus_Jakarta_Sans'] text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-3">
            DISCUSS & <span className="text-[#3D3D3D]">SHARE TIPS.</span>
          </h2>
          <p className="font-['Space_Grotesk'] text-sm md:text-base text-white/60 max-w-xl mx-auto">
            Join the discussion with travelers around the world. Share your experiences, ask questions, or leave feedback.
          </p>
        </div>

        {/* Disqus Embed Container */}
        <div className="bg-[#161616] p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl min-h-[300px]">
          <div id="disqus_thread"></div>
          <noscript>
            Please enable JavaScript to view the{' '}
            <a href="https://disqus.com/?ref_noscript" className="underline text-white">
              comments powered by Disqus.
            </a>
          </noscript>
        </div>
      </div>
    </section>
  );
};
