import React, { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function GeolocationButton() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleGeoLocation() {
    AMap.plugin(["AMap.Geolocation"], () => {
      const instance = new AMap.Geolocation({});
      instance.getCityInfo((status, result) => {
        if (status === "complete") {
          const [lng, lat] = result.position;
          const params = new URLSearchParams(searchParams);
          params.set("lat", lat);
          params.set("lng", lng);
          replace(`${pathname}?${params.toString()}`);
        } else {
          throw new Error("GeoLocation Error");
        }
      });
    });
  }

  return (
    <Suspense>
      <button
        className="absolute bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg w-24"
        onClick={handleGeoLocation}
      >
        点击定位
      </button>
    </Suspense>
  );
}

export default GeolocationButton;
