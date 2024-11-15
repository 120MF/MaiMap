"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import IconSunMoon from "@/components/icons/IconSunMoon";
import IconMoonStars from "@/components/icons/IconMoonStars";

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
        {theme === "light" ? (
          <IconMoonStars height="20px" width="20px" />
        ) : (
          <IconSunMoon height="20px" width="20px" />
        )}
      </button>
    </div>
  );
}
