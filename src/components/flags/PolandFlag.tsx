export function PolandFlag({ className = "w-6 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
      <g fillRule="evenodd">
        <path fill="#fff" d="M0 0h640v240H0z"/>
        <path fill="#dc143c" d="M0 240h640v240H0z"/>
      </g>
    </svg>
  );
}