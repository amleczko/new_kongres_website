export function RegistrationInfo() {
  return (
    <section id="rejestracja" className="w-full py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl">
              Zapisy i szczegóły wkrótce
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Pracujemy nad finalizacją wszystkich szczegółów kongresu. 
              Zapisy ruszą już wkrótce - zostaw swój email, aby być pierwszym, który otrzyma informacje.
            </p>
          </div>
          
          <div className="bg-muted/30 p-8 rounded-lg border max-w-md mx-auto">
            <h3 className="mb-4">Bądź na bieżąco</h3>
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
          
          <div className="mt-12 grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl mb-2">📅</div>
              <h4 className="mb-1">Wkrótce</h4>
              <p className="text-sm text-muted-foreground">Program kongresu</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🎫</div>
              <h4 className="mb-1">Styczeń 2025</h4>
              <p className="text-sm text-muted-foreground">Otwarcie zapisów</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="mb-1">Luty 2025</h4>
              <p className="text-sm text-muted-foreground">Early bird ceny</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}