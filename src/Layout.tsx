import Footer from '@/components/Footer.tsx';
import SearchBar from '@/components/SearchBar.tsx';
import HomePage from '@/pages/HomePage.tsx';
import { useTheme } from '@/stores/useTheme.tsx';
import { HeroUIProvider } from '@heroui/react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
function Layout() {
  const { theme } = useTheme();
  return (
    <HeroUIProvider>
      <BrowserRouter>
        <main className={`${theme} text-foreground bg-background`}>
          <SearchBar />

          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
          <Footer />
        </main>
      </BrowserRouter>
    </HeroUIProvider>
  );
}

export default Layout;
