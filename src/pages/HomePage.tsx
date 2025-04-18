import DrawerBox from '@/components/DrawerBox.tsx';
import GeolocationButton from '@/components/MapComponents/GeolocationButton.tsx';
import MapContainer from '@/components/MapContainer.tsx';
import SearchBar from '@/components/SearchBar.tsx';
import React from 'react';

export default function HomePage() {
  return (
    <>
      <div className="z-30">
        <SearchBar />
      </div>
      <DrawerBox />
      <MapContainer />
      <GeolocationButton />
    </>
  );
}
