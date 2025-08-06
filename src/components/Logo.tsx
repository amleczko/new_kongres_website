import { LogoIcon } from "./LogoIcon";
import { useLanguage } from "../contexts/LanguageContext";

interface LogoProps {
  className?: string;
}

export function Logo({ 
  className = "" 
}: LogoProps) {
  const { t } = useLanguage();
  return (
    <div className={`flex items-center ${className}`}>
      <div className="w-12 h-12 bg-brand-blask flex items-center justify-center">
        <LogoIcon className="w-12 h-12 text-white" />
      </div>
      <div className="ml-2 flex flex-col justify-center text-sm leading-tight text-brand-blask text-left">
        <span className="font-medium text-left">{t('logo.title')}</span>
        <span className="font-medium text-left">{t('logo.subtitle')}</span>
      </div>
    </div>
  );
}