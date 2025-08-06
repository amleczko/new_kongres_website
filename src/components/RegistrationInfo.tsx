import { useLanguage } from "../contexts/LanguageContext";

export function RegistrationInfo() {
  const { t } = useLanguage();
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
              Zostaw swój adres email, aby otrzymać powiadomienie o otwarciu zapisów i poznać wszystkie szczegóły programu.
            </p>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Twój adres email"
                  className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Zapisz się
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Nie wysyłamy spamu. Możesz wypisać się w każdym momencie.
              </p>
            </div>
          </div>
        
        </div>
      </div>
    </section>
  );
}