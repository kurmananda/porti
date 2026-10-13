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
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-glaze p-8 text-center text-paper">
      <Icon name="vessel" className="h-20 w-20 text-glaze-light" />
      <p className="font-display text-3xl">{name}</p>
      <p className="label text-glaze-light">Portrait to come</p>
    </div>
  );
}
