import RangeCircle from '@/components/MapComponents/RangeCircle.tsx';
import { useMap } from '@/stores/useMap.tsx';
import { useTheme } from '@/stores/useTheme.tsx';
import React, { useRef, useState, useEffect } from 'react';
import { BaseMap, MultiCircle } from 'tlbs-map-react';
import { MultiMarker } from 'tlbs-map-react';

const apiKey = process.env.QMAP_KEY;

const LIGHT_STYLE = 'style0';
const DARK_STYLE = 'style1';

const markerGeometry = [
  {
    styleId: 'multiMarkerStyle',
    position: { lat: 40.0404, lng: 116.2735 },
  },
];

function MapContainer() {
  const { theme } = useTheme();
  const [key, setKey] = useState(0);
  const mapStyleId = theme === 'dark' ? DARK_STYLE : LIGHT_STYLE;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <theme变化时刷新Map组件>
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [theme]);

  const { centerLng, centerLat } = useMap();

  return (
    <BaseMap
      key={key}
      apiKey={`${apiKey}`}
      style={{ height: '90svh', width: '100%' }}
      className="z-20"
      options={{
        center: { lat: centerLat, lng: centerLng },
        mapStyleId: mapStyleId,
      }}
    >
      <RangeCircle key={key} />
    </BaseMap>
  );
}

export default MapContainer;
