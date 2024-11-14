import { arcade } from "@/types/arcades";
import ArcadeCard from "@/components/ArcadeCard";

interface ArcadeListPorps {
  arcadeList: arcade[];
}

function ArcadeList({ arcadeList }: ArcadeListPorps) {
  return (
    <div
      data-scroll-restoration-id="container"
      className="custom-scrollbar overflow-y-auto"
    >
      {arcadeList.map((arcade) => (
        <ArcadeCard key={arcade.store_id} arcade={arcade} />
      ))}
    </div>
  );
}

export default ArcadeList;
