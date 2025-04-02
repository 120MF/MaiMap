import { arcade, sortByMethod } from "@/types/arcades";
import ArcadeCard from "@/components/DrawerBoxComponents/ArcadeCard";

interface ArcadeListPorps {
  arcadeList: arcade[];
  sortMethod: string;
}

function ArcadeList({ arcadeList, sortMethod }: ArcadeListPorps) {
  const sortedList = sortByMethod(arcadeList, sortMethod);

  return (
    <div className="custom-scrollbar overflow-y-auto">
      {sortedList.map((arcade, index) => (
        <ArcadeCard key={index} arcade={arcade} />
      ))}
    </div>
  );
}

export default ArcadeList;
