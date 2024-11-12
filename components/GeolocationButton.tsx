import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/button";

import { FaMapLocationDot } from "react-icons/fa6";

function GeolocationButton() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  function handleGeoLocation() {
    if (!navigator.geolocation) {
      throw new Error("Geolocation is not supported by this browser.");
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        const params = new URLSearchParams(searchParams);

        params.set("lat", String(lat));
        params.set("lng", String(lng));
        params.delete("detailId");
        replace(`${pathname}?${params.toString()}`);
        setIsLoading(false);
      },
      (error) => {
        console.error("Geolocation Error:", error);
        setIsLoading(false);
      },
      {
        timeout: 10000,
        enableHighAccuracy: true,
      },
    );
  }

  return (
    <Button
      isIconOnly
      isLoading={isLoading}
      color={"primary"}
      className="absolute bottom-4 right-4"
      onClick={handleGeoLocation}
    >
      <FaMapLocationDot />
    </Button>
  );
}

export default GeolocationButton;
