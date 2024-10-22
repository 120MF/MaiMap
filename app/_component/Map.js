"use client";

import { useEffect, useReducer, useState } from "react";

import {
  Map,
  APILoader,
  ScaleControl,
  ToolBarControl,
  ControlBarControl,
  Geolocation,
  Marker,
} from "@uiw/react-amap";
import { useRouter } from "next/navigation";

function reducer(state, action) {
  switch (action.type) {
    case "center/update":
      return { ...state, centerPos: action.payload };
    case "url/update":
      return {
        ...state,
        urlPos: action.payload,
        centerPos: action.payload,
        hasParams: action.payload[0] && action.payload[1],
      };
    case "geo/update":
      return { ...state, geoPos: action.payload, centerPos: action.payload };
  }
}

export default function MapContainer({ lng = null, lat = null }) {
  const router = useRouter();
  const akey = process.env.NEXT_PUBLIC_AMAP_AKEY;
  const initialState = {
    centerPos: [121.31, 31.2],
    geoPos: [null, null],
    urlPos: [Number(lng), Number(lat)],
    hasParams: lat && lng,
  };

  useEffect(() => {
    dispatch({ type: "url/update", payload: [Number(lng), Number(lat)] });
  }, [lat, lng, router.isReady]);

  const [state, dispatch] = useReducer(reducer, initialState);

  function handleGeoLocation() {
    console.log("click");
    AMap.plugin(["AMap.Geolocation"], () => {
      const instance = new AMap.Geolocation({});
      instance.getCityInfo((status, result) => {
        if (status === "complete") {
          dispatch({ type: "geo/update", payload: result.position });
        } else {
          throw new Error("GeoLocation Error");
        }
      });
    });
  }

  return (
    <APILoader version="2.0.5" akey={akey}>
      <div className="relative">
        <MaiMap state={state} dispatch={dispatch} />
        <button
          className="absolute bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg w-12"
          onClick={handleGeoLocation}
        >
          +
        </button>
      </div>
    </APILoader>
  );
}

function MaiMap({ state, dispatch }) {
  return (
    <Map style={{ height: "90vh", width: "100vw" }} center={state.centerPos}>
      {state.geoPos[0] && (
        <Marker visible={true} position={state.geoPos} title={"定位位置"}>
          <div className={"flex w-12 text-xs text-blue-200 bg-red-300"}>
            定位位置
          </div>
        </Marker>
      )}
      {state.hasParams && (
        <Marker visible={true} position={state.urlPos} title={"标定位置"}>
          <div className={"flex w-12 text-xs text-blue-200 bg-red-300"}>
            标定位置
          </div>
        </Marker>
      )}
    </Map>
  );
}
