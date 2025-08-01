import { Button } from "./ui/button";

export function Hero() {
  return (
    <section id="start" className="w-full py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="mb-6 text-4xl md:text-6xl lg:text-7xl tracking-tight">
            Zbuduj Coś
            <span className="block text-muted-foreground">Niesamowitego Dzisiaj</span>
          </h1>
          
          <p className="mb-8 text-lg md:text-xl text-muted-foreground max-w-2xl">
            Twórz piękne, nowoczesne strony internetowe dzięki naszym potężnym narzędziom i intuicyjnemu systemowi projektowania. 
            Idealne dla firm, portfolio i projektów kreatywnych.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="px-8 py-3">
              Rozpocznij
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3">
              Dowiedz się więcej
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}