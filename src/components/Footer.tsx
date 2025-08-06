import { Logo } from "./Logo";
import { useLanguage } from "../contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="w-full border-t bg-brand-tajemnica">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 md:items-end" id="kontakt">
          {/* First column - Organizer info */}
          <div>
            <div className="mb-6">
              <Logo />
            </div>
            
            <div className="mb-6">
              <h4 className="mb-3 text-brand-gray">{t('footer.organizer')}</h4>
              <div className="text-brand-gray">
                <p>
                  {t('footer.organizer-name')}<br />
                  ul. Pocztowa 9<br />
                  62-200 Gniezno
                </p>
              </div>
            </div>

            {/* Social media */}
            <div>
              <div className="flex space-x-4">
                {/* Facebook */}
                <a 
                  href="https://www.facebook.com/tajemnicatowielka" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                {/* X/Twitter */}
                <a 
                  href="https://x.com/misterograndepl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                
                {/* YouTube */}
                <a 
                  href="https://www.youtube.com/@misterograndepl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Second column - Congress secretariat */}
          <div>
            <div className="mb-6">
              <h4 className="mb-4 text-brand-gray">{t('footer.secretariat')}</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm">
                    <span className="text-brand-gray">Telefon:</span> <span className="text-brand-gray">+48 729 086 962</span>
                    <br/>
                    <span className="text-brand-gray">E-mail:</span>{" "}
                    <a href="mailto:sekretariat@misterogrande.pl" className="text-brand-yellow hover:text-brand-yellow transition-colors">
                      sekretariat@misterogrande.pl
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-brand-gray">{t('footer.media-accreditation')}</h4>
              <p className="text-sm text-brand-gray mb-2">
                {t('footer.media-text')}{" "}
                <a href="mailto:media@misterogrande.pl" className="text-brand-yellow hover:text-brand-yellow transition-colors">
                  media@misterogrande.pl
                </a>.
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-12 pt-8 text-center text-brand-gray">
          <p>&copy; {t('footer.organizer-name')} {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}