"use client";

import { useCallback, useEffect, useReducer, useState } from "react";

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
  }
}

export default function MapContainer({ lng = null, lat = null }) {
  const akey = process.env.NEXT_PUBLIC_AMAP_AKEY;
  const initialState = {
    centerPos: [121.31, 31.2],
    geoPos: [null, null],
    urlPos: [lng, lat],
    hasParams: lat && lng,
  };

  useEffect(() => {
    dispatch({ type: "url/update", payload: [lng, lat] });
  }, [lat, lng]);

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <APILoader version="2.0.5" akey={akey}>
      <MaiMap state={state} dispatch={dispatch} />
    </APILoader>
  );
}

function MaiMap({ state, dispatch }) {
  const [err, setErr] = useState(null);

  useEffect(() => {
    AMap.plugin(["AMap.Geolocation"], () => {
      const instance = new AMap.Geolocation({});
      instance.getCityInfo((status, result) => {
        console.log(">>>>", status, result);
        if (status === "complete") {
          dispatch({ type: "geo/update", payload: result.position });
        } else {
          setErr(result);
        }
      });
    });
  }, [dispatch]);

  return (
    <Map
      style={{ height: "90vh", width: "100vw" }}
      center={state.centerPos}
      pitch={"2D"}
    >
      <Geolocation
        enableHighAccuracy={true}
        timeout={10000}
        zoomToAccuracy={true}
        showCircle={true}
        onComplete={(data) => {
          console.log(data);
          dispatch({ type: "geo/update", payload: data.position });
        }}
        onError={(data) => {
          console.log("错误返回数据：", data);
          setErr(data);
        }}
      />
      <Marker visible={true} position={state.geoPos} title={"定位位置"}>
        <div className={"flex w-12 text-xs text-amber-400 bg-blue-400"}>
          定位位置
        </div>
      </Marker>
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
