import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import SearchBar from '@/components/SearchBar.tsx';
import { HeroUIProvider } from '@heroui/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HeroUIProvider>
      <SearchBar />
      <App />
    </HeroUIProvider>
  </React.StrictMode>,
);
