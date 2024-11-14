"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LuSunMoon, LuMoonStar } from "react-icons/lu";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ? <LuMoonStar size={20} /> : <LuSunMoon size={20} />}
      </button>
    </div>
  );
}
