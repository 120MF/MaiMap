import { useTheme } from '@/stores/useTheme.tsx';
import React, { useRef, useState, useEffect } from 'react';
import { BaseMap, MultiCircle } from 'tlbs-map-react';
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
  circleStyle: {
    color: 'rgba(41,91,255,0.16)',
    showBorder: true,
    borderColor: 'rgba(41,91,255,1)',
    borderWidth: 2,
  },
};

const markerGeometry = [
  {
    styleId: 'multiMarkerStyle',
    position: { lat: 40.0404, lng: 116.2735 },
  },
];

const circleGeometry = [
  {
    styleId: 'circleStyle',
    center: { lat: 40.0404, lng: 116.2735 },
    radius: 5000,
  },
];

function MapContainer() {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const layerRef = useRef(null);
  const { theme } = useTheme();
  const [key_, setKey_] = useState(0);
  const mapStyleId = theme === 'dark' ? DARK_STYLE : LIGHT_STYLE;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <theme变化时刷新Map组件>
  useEffect(() => {
    setKey_((prevKey) => prevKey + 1);
  }, [theme]);

  return (
    <BaseMap
      key={key_} // 添加key属性实现强制重新渲染
      ref={mapRef}
      apiKey={`${key}`}
      style={{ height: '90svh', width: '100%' }}
      className="z-20"
      options={{
        center: { lat: 40.0404, lng: 116.2735 },
        mapStyleId: mapStyleId,
        type: 'vector',
        features: ['base', 'building3d'],
      }}
    >
      <MultiCircle ref={layerRef} geometries={circleGeometry} styles={styles} />
    </BaseMap>
  );
}

export default MapContainer;
