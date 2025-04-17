import { useMap } from '@/stores/useMap.tsx';
import React, { useRef, useEffect } from 'react';
import { MultiCircle } from 'tlbs-map-react';

function RangeCircle() {
  const { centerLat, centerLng, range } = useMap();

  const rangeCircleGeometry = [
    {
      styleId: 'rangeCircleStyle',
      center: { lat: centerLat, lng: centerLng },
      radius: range,
    },
  ];

  const styles = {
    rangeCircleStyle: {
      color: 'rgba(41,91,255,0.16)',
      showBorder: true,
      borderColor: 'rgba(41,91,255,1)',
      borderWidth: 2,
    },
  };

  return <MultiCircle geometries={rangeCircleGeometry} styles={styles} />;
}

export default RangeCircle;
