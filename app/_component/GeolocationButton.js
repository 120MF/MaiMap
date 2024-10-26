import React, { Suspense, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/button";

import { FaMapLocationDot } from "react-icons/fa6";

function GeolocationButton() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  function handleGeoLocation() {
    AMap.plugin(["AMap.Geolocation"], () => {
      setIsLoading(true);
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
        setIsLoading(false);
      });
    });
  }

  return (
    <Suspense>
      <Button
        isIconOnly
        isLoading={isLoading}
        color={"primary"}
        className="absolute bottom-4 right-4"
        onClick={handleGeoLocation}
      >
        <FaMapLocationDot />
      </Button>
    </Suspense>
  );
}

export default GeolocationButton;
