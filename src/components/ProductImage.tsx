"use client";

import { useState } from "react";

export default function ProductImage({
  src,
  alt,
  scale = 1,
  emojiClass = "text-5xl",
}: {
  src: string;
  alt: string;
  scale?: number;
  emojiClass?: string;
}) {
  const [failed, setFailed] = useState(false);

  // Fotoğraf yoksa ya da bulunamadıysa emoji göster
  if (failed) {
    return (
      <div className={`absolute inset-0 flex items-center justify-center ${emojiClass}`}>
        🦸
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      style={{ transform: `scale(${scale})` }}
      className="absolute inset-0 h-full w-full object-contain transition-transform duration-300"
    />
  );
}