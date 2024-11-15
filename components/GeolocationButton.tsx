import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/button";

import IconLocationCrosshairs from "@/components/icons/IconLocationCrosshairs";

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
        params.delete("arcadeId");
        replace(`${pathname}?${params.toString()}`);
        setIsLoading(false);
      },
      (error) => {
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
      className="absolute top-[7%] right-[1%]"
      color="primary"
      isLoading={isLoading}
      onClick={handleGeoLocation}
    >
      <IconLocationCrosshairs />
    </Button>
  );
}

export default GeolocationButton;
