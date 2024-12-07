import Image from "next/image";
import { Marker } from "@uiw/react-amap-marker";

function TargetMarker({ targetLng, targetLat }) {
  return (
    <Marker
      // @ts-ignore
      offset={new AMap.Pixel(-15, -42)}
      position={[targetLng, targetLat]}
      title={"标定位置"}
      visible={true}
      zIndex={300}
    >
      <Image alt="target" height={50} src="/nail-target.png" width={30} />
    </Marker>
  );
}

export default TargetMarker;
