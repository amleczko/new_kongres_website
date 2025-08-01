import { LogoIcon } from "./LogoIcon";

interface LogoProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function Logo({ 
  title = "III Międzynarodowy Kongres",
  subtitle = "„Odkryj małżeństwo\"",
  className = "" 
}: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="w-12 h-12 bg-brand-blask flex items-center justify-center">
        <LogoIcon className="w-12 h-12 text-white" />
      </div>
      <div className="ml-2 flex flex-col justify-center text-sm leading-tight text-brand-blask">
        <span className="font-medium">{title}</span>
        <span className="font-medium">{subtitle}</span>
      </div>
    </div>
  );
}