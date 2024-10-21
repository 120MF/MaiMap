"use client";

import {useEffect, useState} from "react"

import {
  Map,
  APILoader,
  ScaleControl,
  ToolBarControl,
  ControlBarControl,
  Geolocation,
  Marker,
} from "@uiw/react-amap";

function MaiMap({ lat, lng }) {

  const [geoData, setGeoData] = useState(null)

  useEffect(() => {
    AMap.plugin(['AMap.Geolocation'], () => {
      const instance = new AMap.Geolocation({});
      instance.getCityInfo((status, result) => {
        console.log('>>>>', status, result)
        if(status === 'complete'){
          setGeoData(result);
        } else {
          setGeoData(result);
        }
      });
    });
  }, []);
  const center = [geoData?.position[0], geoData?.position[1]];

  return (geoData ?(
  <Map style={{height: "90vh", width: "100vw"}} center={center}>
    <Geolocation
        enableHighAccuracy={true}
        timeout={10000}
        zoomToAccuracy={true}
        showCircle={false}
    />
    <Marker visible={true} position={center} title={"当前位置"}>
      <div className={'flex w-12 text-xs text-amber-400 bg-blue-400'}>当前位置</div>
    </Marker>
  </Map>)
            :
            <p>Loading...</p>

  );
}

export default function MapContainer(){
  const akey = process.env.NEXT_PUBLIC_AMAP_AKEY;
  return (
      <APILoader version="2.0.5" akey={akey}>
        <MaiMap />
      </APILoader>
  )
}