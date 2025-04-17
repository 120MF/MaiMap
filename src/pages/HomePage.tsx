import MapContainer from '@/components/MapContainer.tsx';
import SearchBar from '@/components/SearchBar.tsx';
import React from 'react';

export default function HomePage() {
  return (
    <>
      <div className="z-30">
        <SearchBar />
      </div>
      <MapContainer />
    </>
  );
}
