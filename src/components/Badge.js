import Icon from "./Icons";

// Slowly turning ring of text around a vessel, like a potter's stamp.
export default function Badge({ text, className = "" }) {
  const ring = `${text} · ${text} · `.toUpperCase();
  return (
    <div aria-hidden="true" className={className}>
      <div className="relative grid h-32 w-32 place-items-center rounded-full bg-glaze text-paper shadow-xl shadow-ink/20 sm:h-36 sm:w-36">
        <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full">
          <defs>
            <path id="badge-ring" d="M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1-74 0" />
          </defs>
          <text fill="currentColor" fontSize="8.2" fontWeight="500" letterSpacing="2.1">
            <textPath href="#badge-ring" textLength="230">
              {ring}
            </textPath>
          </text>
        </svg>
        <Icon name="vessel" className="h-12 w-12" />
      </div>
    </div>
  );
}
