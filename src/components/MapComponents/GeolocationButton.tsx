import { Button } from '@heroui/button';
import React, { useEffect, useState } from 'react';

import IconLocationCrosshairs from '@/components/icons/IconLocationCrosshairs';
import { errorToast, successToast } from '@/lib/toast.tsx';
import { useArcades } from '@/stores/useArcades.tsx';
import { useMap } from '@/stores/useMap.tsx';

function GeolocationButton() {
  const { update_center } = useMap();
  const { update_arcadeId } = useArcades();
  const [isLoading, setIsLoading] = useState(false);
  const [browserFailure, setBrowserFailure] = useState(false);

  useEffect(() => {
    async function fetchIpGeolocation() {
      const ipRes = await fetch('https://ipapi.co/json');
      const ipData = await ipRes.json();
      const userIp = ipData.ip;

      // 理论上可以直接在client side去fetch 腾讯地图的api，但是会遇到跨域请求失败，于是只能走server side
      const res = await fetch(
        `/mapApi/ws/location/v1/ip?key=${process.env.QMAP_KEY}&ip=${userIp}`,
      );
      const data = await res.json();
      console.log(data);

      if (data.status === 0) {
        update_center([data.result.location.lng, data.result.location.lat]);
        update_arcadeId(0);
        successToast('尝试使用IP定位成功');
      } else {
        errorToast('尝试使用IP定位失败');
      }
      setIsLoading(false);
      setBrowserFailure(false);
    }
    if (browserFailure) fetchIpGeolocation();
  }, [browserFailure, update_arcadeId, update_center]);

  async function handleGeoLocation() {
    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        update_center([lng, lat]);
        update_arcadeId(0);
        successToast('精确定位成功');
        setIsLoading(false);
      },
      (error) => {
        errorToast('精确定位失败');
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
      className="absolute top-60 right-8 z-50 bg-white text-black shadow-sm"
      isLoading={isLoading}
      onPress={handleGeoLocation}
    >
      <IconLocationCrosshairs />
    </Button>
  );
}

export default GeolocationButton;
