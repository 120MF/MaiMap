import ArcadeMarkers from '@/components/MapComponents/ArcadeMarker.tsx';
import RangeCircle from '@/components/MapComponents/RangeCircle.tsx';
import { useArcades } from '@/stores/useArcades.tsx';
import { useMap } from '@/stores/useMap.tsx';
import { useTheme } from '@/stores/useTheme.tsx';
import React, { useRef, useState, useEffect } from 'react';
import { BaseMap } from 'tlbs-map-react';

const apiKey = process.env.QMAP_KEY;

const LIGHT_STYLE = 'style0';
const DARK_STYLE = 'style1';

function MapContainer() {
  const { theme } = useTheme();
  const [key, setKey] = useState(0);
  const mapStyleId = theme === 'dark' ? DARK_STYLE : LIGHT_STYLE;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <theme变化时刷新Map组件>
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [theme]);

  const { centerLng, centerLat, range } = useMap();
  const { fetch_nearby_arcade } = useArcades();

  useEffect(() => {
    fetch_nearby_arcade(centerLat, centerLng, range);
  }, [centerLat, centerLng, range, fetch_nearby_arcade]);

  return (
    <>
      <BaseMap
        key={key}
        apiKey={`${apiKey}`}
        style={{ height: '90svh', width: '100%' }}
        className="z-20"
        options={{
          center: { lat: centerLat, lng: centerLng },
          mapStyleId: mapStyleId,
          offset: { x: 0, y: -50 },
        }}
      >
        <RangeCircle />
        <ArcadeMarkers />
      </BaseMap>
    </>
  );
}

export default MapContainer;
