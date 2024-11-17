import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/button";
import { useTheme } from "next-themes";

import IconLocationCrosshairs from "@/components/icons/IconLocationCrosshairs";
import { Bounce, toast } from "react-toastify";

function GeolocationButton() {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  function handleGeoLocation() {
    setIsLoading(true);
    AMap.plugin(["AMap.Geolocation"], () => {
      const instance = new AMap.Geolocation({ enableHighAccuracy: true });
      instance.getCityInfo((status, result) => {
        console.log(">>>>", status, result);
        if (status === "complete") {
          const params = new URLSearchParams(searchParams);
          console.log(result.position[1]);

          params.set("lat", String(result.position[1]));
          params.set("lng", String(result.position[0]));
          params.delete("arcadeId");
          replace(`${pathname}?${params.toString()}`);
          toast.success("手动定位成功", {
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
          toast.error("手动定位失败，请尝试直接输入地点", {
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
      });
    });
    setIsLoading(false);

    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     const { latitude: lat, longitude: lng } = position.coords;
    //     const params = new URLSearchParams(searchParams);
    //
    //     params.set("lat", String(lat));
    //     params.set("lng", String(lng));
    //     params.delete("arcadeId");
    //     replace(`${pathname}?${params.toString()}`);
    //     setIsLoading(false);
    //   },
    //   (error) => {
    //     setIsLoading(false);
    //   },
    //   {
    //     timeout: 10000,
    //     enableHighAccuracy: true,
    //   },
    // );
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
