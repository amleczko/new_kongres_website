"use client";

import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export function RegistrationInfo() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage(t('newsletter.error-empty'));
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-mg': 'JP1tQEcZqamQ5z0jXHFqlaapMw4jjZekVGkDC0GvAZHpoS9bea23GopvjwRRUweu'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setMessage(t('newsletter.success'));
        setEmail("");
      } else {
        setMessage(t('newsletter.error-generic'));
      }
    } catch {
      setMessage(t('newsletter.error-connection'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rejestracja" className="w-full py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <h2 
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              style={{ 
                fontFamily: "p22-mackinac-pro, serif"
              }}
            >
              {t('registration.title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('registration.description')}
            </p>
          </div>
          
          <div className="bg-muted/30 p-8 rounded-lg border">
          
            <p className="text-sm text-muted-foreground mb-6">
              {t('newsletter.description')}
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {message && message === t('newsletter.success') ? (
                <div className="text-center py-3">
                  <p className="text-lg font-medium text-green-600">
                    {message}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder={t('newsletter.email-placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                  />
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? t('newsletter.submitting') : t('newsletter.submit')}
                  </button>
                </div>
              )}
              {message && message !== t('newsletter.success') && (
                <p className={`text-sm ${message.includes(t('newsletter.error-empty')) || message.includes(t('newsletter.error-generic')) || message.includes(t('newsletter.error-connection')) ? 'text-red-600' : 'text-green-600'}`}>
                  {message}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                {t('newsletter.privacy')}
              </p>
            </form>
          </div>
        
        </div>
      </div>
    </section>
  );
}