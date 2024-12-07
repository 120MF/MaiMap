import pinyin from "pinyin";

export type arcade = {
  store_id: number;
  store_name: string;
  store_address: string;
  store_lat: number;
  store_lng: number;
  store_pos: string;
  arcade_type: string;
  arcade_dead: boolean;
  store_arcade_count: number;
  store_coin_price: number;
  store_pc_coin_count: number;
  distance: number;
};

export enum SortMethod {
  DistanceAscending,
  DistanceDescending,
  PinyinAscending,
  PinyinDescending,
  Default,
}

export function sortByMethod(list: arcade[], method: string): arcade[] {
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
