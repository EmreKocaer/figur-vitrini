"use client";

import { useEffect, useState } from "react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  // Kullanıcı kapattıysa bu oturumda tekrar gösterme
  useEffect(() => {
    if (sessionStorage.getItem("fv-bar-closed") === "1") setVisible(false);
  }, []);

  const close = () => {
    setVisible(false);
    sessionStorage.setItem("fv-bar-closed", "1");
  };

  if (!visible) return null;

  return (
    <div className="relative bg-purple-700 px-10 py-2 text-center text-xs font-medium text-white sm:text-sm">
      3000 TL ve Üzerindeki Alışverişlerinizde Kargo Ücretsiz📦
      <button
        onClick={close}
        aria-label="Şeridi kapat"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-lg leading-none hover:bg-purple-600 sm:right-4"
      >
        ✕
      </button>
    </div>
  );
}