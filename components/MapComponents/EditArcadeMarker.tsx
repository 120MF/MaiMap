import { Marker } from "@uiw/react-amap-marker";
import Image from "next/image";
import { LabelMarker } from "@uiw/react-amap-label-marker";

function EditArcadeMarker({ markLng, markLat }) {
  return (
    <div>
      <Marker
        // @ts-ignore
        offset={new AMap.Pixel(-15, -42)}
        position={[markLng, markLat]}
        title={"标记位置"}
        visible={true}
        zIndex={300}
      >
        <Image
          alt="marking"
          height={50}
          src="/nail-arcade-mark.png"
          width={30}
        />
      </Marker>
      <LabelMarker
        // @ts-ignore
        icon={null}
        position={[markLng, markLat]}
        text={{
          content: "标记位置",
          direction: "top",
          offset: [0, 18],
          style: {
            strokeColor: "#ffffff",
            fontSize: 10,
            fillColor: "#60666E",
            strokeWidth: 4,
            backgroundColor: "rgba(0,0,0,0)",
          },
        }}
      />
    </div>
  );
}

export default EditArcadeMarker;
