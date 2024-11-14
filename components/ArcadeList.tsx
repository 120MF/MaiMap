import pinyin from "pinyin";

import { arcade } from "@/types/arcades";
import ArcadeCard from "@/components/ArcadeCard";

interface ArcadeListPorps {
  arcadeList: arcade[];
  sortMethod: string;
}

function sortByMethod(list: arcade[], method: string): arcade[] {
  let tempList: arcade[] = [...list];

  switch (method) {
    case "DistanceAscending":
      tempList.sort((a, b) => a.distance - b.distance);
      return tempList;
    case "DistanceDescending":
      tempList.sort((a, b) => b.distance - a.distance);
      return tempList;
    case "PinyinAscending":
      tempList.sort((a, b) => {
        const pinyinA = pinyin(a.store_name, {
          style: pinyin.STYLE_FIRST_LETTER,
        }).join("");

        const pinyinB = pinyin(b.store_name, {
          style: pinyin.STYLE_FIRST_LETTER,
        }).join("");
        return pinyinA.localeCompare(pinyinB);
      });
      return tempList;
    case "PinyinDescending":
      tempList.sort((a, b) => {
        const pinyinA = pinyin(a.store_name, {
          style: pinyin.STYLE_FIRST_LETTER,
        }).join("");

        const pinyinB = pinyin(b.store_name, {
          style: pinyin.STYLE_FIRST_LETTER,
        }).join("");
        return pinyinB.localeCompare(pinyinA);
      });
      return tempList;
    case "Default":
    default:
      return tempList;
  }
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
