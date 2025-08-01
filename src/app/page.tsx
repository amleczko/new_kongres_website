import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AboutCongress } from "@/components/AboutCongress";
import { RegistrationInfo } from "@/components/RegistrationInfo";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section id="start">
          <Hero />
        </section>
        <section id="o-kongresie">
          <AboutCongress />
        </section>
        <section id="zapisy">
          <RegistrationInfo />
        </section>
      </main>
      <footer id="kontakt">
        <Footer />
      </footer>
    </div>
  );
}
