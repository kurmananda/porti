"use client";

// Works are added by pasting any image link, so the host isn't known ahead of
// time and next/image's remotePatterns allow-list can't be used.
export default function WorkImage({ src, alt, className = "", eager = false }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={`work-image ${className}`}
      // The image may finish loading before hydration, when onLoad can't fire.
      ref={(el) => {
        if (el?.complete && el.naturalWidth > 0) el.dataset.loaded = "";
      }}
      onLoad={(event) => {
        event.currentTarget.dataset.loaded = "";
      }}
      onError={(event) => {
        event.currentTarget.dataset.failed = "";
      }}
    />
  );
}
