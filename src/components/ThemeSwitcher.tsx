'use client';

import IconMoonStars from '@/components/icons/IconMoonStars';
import IconSunMoon from '@/components/icons/IconSunMoon';
import { useTheme } from '@/stores/useTheme';
import { useEffect, useState } from 'react';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, update_theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <button
        type="button"
        onClick={() => update_theme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? (
          <IconMoonStars height="20px" width="20px" />
        ) : (
          <IconSunMoon height="20px" width="20px" />
        )}
      </button>
    </div>
  );
}
