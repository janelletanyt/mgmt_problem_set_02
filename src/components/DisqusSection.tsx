import React, { useEffect } from 'react';

declare global {
  interface Window {
    DISQUS?: {
      reset: (options: { reload: boolean; config?: (this: any) => void }) => void;
    };
    disqus_config?: (this: any) => void;
  }
}

/**
 * DisqusSection Component
 * Embeds Disqus Universal Code with shortname 'geekai' and fixed identifier 'home'
 *
 * Universal Code Configuration:
 * var disqus_config = function () {
 *   this.page.url = 'https://mgmt-problem-set-02.vercel.app';
 *   this.page.identifier = 'home';
 * };
 * (function() {
 *   var d = document, s = d.createElement('script');
 *   s.src = 'https://geekai.disqus.com/embed.js';
 *   s.setAttribute('data-timestamp', +new Date());
 *   (d.head || d.body).appendChild(s);
 * })();
 */
export const DisqusSection: React.FC = () => {
  useEffect(() => {
    const canonicalUrl = 'https://mgmt-problem-set-02.vercel.app';
    const identifier = 'home';

    // Set configuration variables for the Disqus Universal Code
    const configureDisqus = function (this: any) {
      this.page = this.page || {};
      this.page.url = canonicalUrl;
      this.page.identifier = identifier;
    };

    window.disqus_config = configureDisqus;

    if (window.DISQUS) {
      try {
        window.DISQUS.reset({
          reload: true,
          config: configureDisqus,
        });
      } catch (err) {
        console.debug('Disqus reset note:', err);
      }
    } else {
      // Ensure script is loaded only once across re-renders
      const scriptSelector = 'script[src="https://geekai.disqus.com/embed.js"]';
      const existingScript = document.querySelector<HTMLScriptElement>(scriptSelector);

      if (existingScript) {
        existingScript.addEventListener('load', () => {
          if (window.DISQUS) {
            try {
              window.DISQUS.reset({
                reload: true,
                config: configureDisqus,
              });
            } catch (err) {
              console.debug('Disqus reset on load note:', err);
            }
          }
        });
      } else {
        const d = document;
        const s = d.createElement('script');
        s.id = 'disqus-embed-script';
        s.src = 'https://geekai.disqus.com/embed.js';
        s.setAttribute('data-timestamp', String(+new Date()));
        s.async = true;
        (d.head || d.body).appendChild(s);
      }
    }
  }, []);

  return (
    <section className="px-4 sm:px-6 py-5 border-t border-slate-200 bg-white" aria-labelledby="feedback-heading">
      <h2 id="feedback-heading" className="text-base font-semibold text-slate-800 mb-1">
        Feedback
      </h2>
      <p className="text-xs text-slate-500 mb-4">
        Leave your feedback below — let us know what worked for you and what did not.
      </p>
      <div id="disqus_thread" className="min-h-[160px]" />
      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript" rel="nofollow" className="text-rose-600 underline">
          comments powered by Disqus.
        </a>
      </noscript>
    </section>
  );
};

export default DisqusSection;
