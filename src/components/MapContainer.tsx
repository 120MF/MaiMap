import { useTheme } from '@/stores/useTheme.tsx';
import React, { useRef, useState, useEffect } from 'react';
import { TMap } from 'tlbs-map-react';
import { MultiMarker } from 'tlbs-map-react';

const key = process.env.QMAP_KEY;

const LIGHT_STYLE = 'style0';
const DARK_STYLE = 'style1';

const styles = {
  multiMarkerStyle: {
    width: 20,
    height: 30,
    anchor: { x: 10, y: 30 },
  },
};

const geometries = [
  {
    styleId: 'multiMarkerStyle',
    position: { lat: 40.0404, lng: 116.2735 },
  },
];

function MapContainer() {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const { theme } = useTheme();
  const [key, setKey] = useState(0);

  const mapStyleId = theme === 'dark' ? DARK_STYLE : LIGHT_STYLE;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [theme]);

  return (
    <TMap
      key={key} // 添加key属性实现强制重新渲染
      ref={mapRef}
      apiKey={`${key}`}
      style={{ height: '90svh', width: '100%' }}
      className="z-10"
      options={{ mapStyleId: mapStyleId }}
    >
      <MultiMarker ref={markerRef} styles={styles} geometries={geometries} />
    </TMap>
  );
}

export default MapContainer;
