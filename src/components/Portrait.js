import Icon from "./Icons";
import WorkImage from "./WorkImage";

// The artist's photograph. Until a portrait link is saved in the admin
// ("Site details"), a plain panel holds its place.
export default function Portrait({ src, name, eager = false, className = "" }) {
  if (src) {
    return (
      <WorkImage
        src={src}
        alt={`Portrait of ${name}`}
        eager={eager}
        className={`h-full w-full object-cover object-[56%_center] ${className}`}
      />
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-paper p-8 text-center text-ink">
      <Icon name="vessel" className="h-16 w-16 text-stone" />
      <p className="font-display text-3xl">{name}</p>
      <p className="label text-stone">Portrait to come</p>
    </div>
  );
}
