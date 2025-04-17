import { useMap } from '@/stores/useMap.tsx';
import React, { useRef, useEffect } from 'react';
import { MultiCircle } from 'tlbs-map-react';

function RangeCircle() {
  const { centerLat, centerLng, range } = useMap();
  const circleRef = useRef(null);

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

  // 组件卸载时清理图层
  useEffect(() => {
    return () => {
      console.log(circleRef.current, range);
    };
  }, [range]);

  return (
    <MultiCircle
      ref={circleRef}
      geometries={rangeCircleGeometry}
      styles={styles}
    />
  );
}

export default RangeCircle;
