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
        <main
          className={`${theme} text-foreground bg-background h-full overflow-hidden`}
        >
          <div className="flex-1 flex flex-col">
            <div className="m-0 p-0" style={{ height: '90svh' }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
              </Routes>
            </div>
            <div className="z-30" style={{ height: '10svh' }}>
              <Footer />
            </div>
          </div>
        </main>
      </BrowserRouter>
    </HeroUIProvider>
  );
}

export default Layout;
