"use client";

import { Suspense, useState, ReactNode } from "react";
import AnnouncementBar from "./AnnouncementBar";
import Header from "./Header";
import CartDrawer from "./CartDrawer";

export default function SiteShell({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <AnnouncementBar />
      <Suspense fallback={null}>
        <Header onCartClick={() => setCartOpen(true)} />
      </Suspense>
      <main>{children}</main>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}