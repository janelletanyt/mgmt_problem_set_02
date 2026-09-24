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

    // Set configuration for the initial embed load
    window.disqus_config = function (this: any) {
      this.page.url = canonicalUrl;
      this.page.identifier = identifier;
    };

    if (window.DISQUS) {
      // Script is already loaded; reload thread with current page configuration
      window.DISQUS.reset({
        reload: true,
        config: function (this: any) {
          this.page.url = canonicalUrl;
          this.page.identifier = identifier;
        },
      });
    } else {
      // Ensure script tag is inserted only once across re-renders
      const scriptId = 'disqus-embed-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://geekai.disqus.com/embed.js';
        script.setAttribute('data-timestamp', String(+new Date()));
        script.async = true;
        (document.head || document.body).appendChild(script);
      }
    }
  }, []);

  return (
    <section className="pt-6 border-t border-slate-200" aria-label="Visitor Feedback">
      <p className="text-xs text-slate-600 mb-3">
        Leave your feedback below — let us know what worked for you and what did not.
      </p>
      <div id="disqus_thread" className="min-h-[140px]" />
    </section>
  );
};
