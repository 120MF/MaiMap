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
    case "nearby/update":
      return { ...state, nearbyArcades: action.payload };
  }
}

export default function MapContainer({ lng = 116.397183, lat = 39.909333 }) {
  const akey = process.env.NEXT_PUBLIC_AMAP_AKEY;
  const initialState = {
    centerPos: [116.38, 39.9],
    geoPos: [null, null],
    urlPos: [Number(lng), Number(lat)],
    hasParams: lat && lng,
    nearbyArcades: [],
  };

  useEffect(() => {
    dispatch({ type: "url/update", payload: [Number(lng), Number(lat)] });

    async function fetchArcades() {
      const res = await fetch(`/api/arcades/get?lat=${lat}&lng=${lng}`);
      const result = await res.json();
      dispatch({ type: "nearby/update", payload: result });
    }
    fetchArcades();
  }, [lat, lng]);

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
  console.log(state.nearbyArcades);
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
      {state.nearbyArcades.map((arcade, index) => (
        <Marker
          key={index}
          visible={true}
          position={[Number(arcade.pos[1]), Number(arcade.pos[0])]}
          title={"舞萌位置"}
        >
          <div className={"flex w-12 text-xs text-red-400 bg-green-400"}>
            舞萌位置
          </div>
        </Marker>
      ))}
    </Map>
  );
}
