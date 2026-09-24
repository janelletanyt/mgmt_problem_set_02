import React, { useEffect } from 'react';

declare global {
  interface Window {
    DISQUS?: {
      reset: (options: { reload: boolean; config?: (this: any) => void }) => void;
    };
    disqus_config?: (this: any) => void;
  }
}

export const DisqusComments: React.FC = () => {
  useEffect(() => {
    const canonicalUrl = 'https://mgmt-problem-set-02.vercel.app/';
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
      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[src="https://geekai.disqus.com/embed.js"]'
      );

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
        s.src = 'https://geekai.disqus.com/embed.js';
        s.setAttribute('data-timestamp', String(+new Date()));
        s.async = true;
        (d.head || d.body).appendChild(s);
      }
    }
  }, []);

  return (
    <section className="pt-6 border-t border-slate-200" aria-label="Visitor Feedback">
      <p className="text-xs text-slate-600 mb-3">
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
