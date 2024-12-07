import { Marker } from "@uiw/react-amap-marker";
import Image from "next/image";
import { LabelMarker } from "@uiw/react-amap-label-marker";

import { arcade } from "@/types/arcades";

class ArcadeMarkerProps {
  arcade: arcade;
  currentArcadeId: number;
  onMarkerClick: (arg0: arcade) => void;
}

function ArcadeMarker({
  arcade,
  currentArcadeId,
  onMarkerClick,
}: ArcadeMarkerProps) {
  return (
    <div>
      <Marker
        // @ts-ignore
        offset={new AMap.Pixel(-15, -42)}
        position={[arcade.store_lng, arcade.store_lat]}
        title={arcade.store_name}
        visible={true}
        zIndex={currentArcadeId === arcade.store_id ? 200 : 100}
        onClick={() => {
          onMarkerClick(arcade);
        }}
      >
        {/*分支一：被选中，机厅停业，显示nail-arcade-dead-selected.png*/}
        {/*分支二：被选中，机厅正常，显示nail-arcade-selected.png*/}
        {/*分支三：未被选中，机厅停业，显示nail-arcade-dead.png*/}
        {/*分支四：未被选中，机厅正常，显示nail-arcade.png*/}
        <Image
          alt="arcade"
          height={50}
          src={`${currentArcadeId === arcade.store_id ? (arcade.arcade_dead ? "/nail-arcade-dead-selected.png" : "/nail-arcade-selected.png") : arcade.arcade_dead ? "/nail-arcade-dead.png" : "/nail-arcade.png"}`}
          width={30}
        />
      </Marker>
      <LabelMarker
        // @ts-ignore
        icon={null}
        position={[arcade.store_lng, arcade.store_lat]}
        text={{
          content: arcade.store_name,
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

export default ArcadeMarker;
