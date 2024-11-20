import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/button";
import { useTheme } from "next-themes";
import { Bounce, toast } from "react-toastify";

import IconLocationCrosshairs from "@/components/icons/IconLocationCrosshairs";

function GeolocationButton() {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [browserFailure, setBrowserFailure] = useState(false);

  useEffect(() => {
    async function fetchIpGeolocation() {
      const params = new URLSearchParams(searchParams);
      const res = await fetch(
        `/api/qmap/ip?key=${process.env.NEXT_PUBLIC_QMAP_API_KEY}`,
      );
      const data = await res.json();

      if (data.status === 0) {
        params.set("lat", String(data.result.location.lat));
        params.set("lng", String(data.result.location.lng));
        params.delete("arcadeId");
        replace(`${pathname}?${params.toString()}`);
        toast.success("尝试使用IP定位成功", {
          position: "top-right",
          autoClose: 3000,
          type: "success",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme,
          transition: Bounce,
        });
      } else {
        toast.error(`尝试使用IP定位失败，${data.message}`, {
          position: "top-right",
          autoClose: 3000,
          type: "error",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme,
          transition: Bounce,
        });
      }

      setIsLoading(false);
      setBrowserFailure(false);
    }
    if (browserFailure) fetchIpGeolocation();
  }, [browserFailure]);

  async function handleGeoLocation() {
    setIsLoading(true);
    const params = new URLSearchParams(searchParams);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;

        params.set("lat", String(lat));
        params.set("lng", String(lng));
        params.delete("arcadeId");
        replace(`${pathname}?${params.toString()}`);
        toast.success("精确定位成功", {
          position: "top-right",
          autoClose: 3000,
          type: "success",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme,
          transition: Bounce,
        });
        setIsLoading(false);
      },
      (error) => {
        toast.error(`精确定位失败：${error}`, {
          position: "top-right",
          autoClose: 3000,
          type: "error",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme,
          transition: Bounce,
        });
        setBrowserFailure(true);
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
      onPress={handleGeoLocation}
    >
      <IconLocationCrosshairs />
    </Button>
  );
}

export default GeolocationButton;
