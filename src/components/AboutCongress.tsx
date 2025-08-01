export function AboutCongress() {
  return (
    <section className="w-full py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl">
              O kongresie
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Poznaj szczegóły tego wyjątkowego wydarzenia, które zmieni Twoje spojrzenie na branżę
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="mb-6">Czego możesz się spodziewać?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <p className="text-muted-foreground">
                    Inspirujące wykłady od uznanych ekspertów z branży
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <p className="text-muted-foreground">
                    Warsztaty praktyczne z najnowszymi technologiami
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <p className="text-muted-foreground">
                    Networking z profesjonalistami z całego kraju
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <p className="text-muted-foreground">
                    Prezentacje najnowszych trendów i rozwiązań
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-background p-8 rounded-lg border">
              <h3 className="mb-4">Kluczowe informacje</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Data</h4>
                  <p>15-16 marca 2025</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Miejsce</h4>
                  <p>Centrum Konferencyjne, Warszawa</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Uczestnicy</h4>
                  <p>Do 500 osób</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Format</h4>
                  <p>Hybrydowy (stacjonarnie + online)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}