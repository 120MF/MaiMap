import { arcade } from "@/types/arcades";
import ArcadeCard from "@/components/ArcadeCard";

interface ArcadeListPorps {
  arcadeList: arcade[];
}

function ArcadeList({ arcadeList }: ArcadeListPorps) {
  return (
    <ul>
      {arcadeList.map((arcade) => (
        <ArcadeCard key={arcade.store_id} arcade={arcade} />
      ))}
    </ul>
  );
}

export default ArcadeList;
