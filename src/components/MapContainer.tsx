import React, { useCallback, useRef } from 'react';
import { TMap } from 'tlbs-map-react';
import { MultiMarker } from 'tlbs-map-react';

const key = process.env.QMAP_KEY;

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
  // @ts-ignore
  const clickHandler = useCallback((event: TMap.MapEvent) => {
    console.log('🚀🚀🚀 点标记图层点击事件', event);
  }, []);
  return (
    <TMap ref={mapRef} apiKey={`${key}`}>
      <MultiMarker
        ref={markerRef}
        styles={styles}
        geometries={geometries}
        onClick={clickHandler}
      />
    </TMap>
  );
}

export default MapContainer;
