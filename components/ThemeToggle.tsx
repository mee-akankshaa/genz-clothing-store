"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("driplab-theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  };

  return (
    <button type="button" onClick={toggle} className="chip" aria-pressed={dark ?? false} aria-label="Dark mode">
      {dark ? "Dark" : "Light"}
    </button>
  );
}
