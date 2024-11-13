"use client";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { FaList } from "react-icons/fa6";
import { IoReturnUpBack } from "react-icons/io5";

import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Select, SelectItem } from "@nextui-org/select";
import {
  sortMethodToChineseString,
  chineseStringToSortMethod,
  useArcades,
} from "@/stores/useArcades";
import PathButton from "@/components/PathButton";
import { useMap } from "@/stores/useMap";
import ArcadeList from "@/components/ArcadeList";
import ArcadeDetail from "@/components/ArcadeDetail";

function SideBox() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const targetLat = useMap((state) => state.targetLat);
  const targetLng = useMap((state) => state.targetLng);

  const arcadeId = useArcades((state) => state.arcadeId);
  const detailArcade = useArcades((state) => state.detailArcade);
  const nearbyArcades = useArcades((state) => state.nearbyArcades);
  const sortMethod: string = sortMethodToChineseString(
    useArcades((state) => state.sortMethod),
  );
  const update_sortMethod = useArcades((state) => state.update_sortMethod);

  function toggleBox() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative z-20">
      <Button
        onClick={toggleBox}
        className="fixed bottom-[12%] right-4"
        isIconOnly
      >
        <FaList />
      </Button>

      {/* 侧边栏 */}
      <div
        className={`fixed top-1/2 right-0 transform -translate-y-1/2 w-[60%] h-[60%] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center h-full">
          <Card
            className={`flex w-full h-full overflow-y-auto opacity-90`}
            isBlurred={true}
          >
            <CardHeader className="flex justify-between items-center h-14">
              {arcadeId > 0 ? (
                <p className="text-xl">机厅详情</p>
              ) : (
                <>
                  <p className="text-xl">机厅列表</p>
                  <Select
                    className="max-w-40"
                    defaultSelectedKeys=""
                    label="排序方式"
                    selectedKeys={[sortMethod]}
                    variant="underlined"
                    onChange={(e) => {
                      update_sortMethod(
                        chineseStringToSortMethod(e.target.value),
                      );
                    }}
                  >
                    <SelectItem key="按距离升序">按距离升序</SelectItem>
                    <SelectItem key="按距离降序">按距离降序</SelectItem>
                    <SelectItem key="按拼音升序">按拼音升序</SelectItem>
                    <SelectItem key="按拼音降序">按拼音降序</SelectItem>
                    <SelectItem key="默认">默认</SelectItem>
                  </Select>
                </>
              )}
              {arcadeId > 0 && (
                <Button
                  onClick={() => {
                    params.delete("arcadeId");
                    replace(`${pathname}?${params.toString()}`);
                  }}
                  isIconOnly
                  //@ts-ignore
                  showAnchorIcon
                  variant="bordered"
                  className="ml-auto"
                >
                  <IoReturnUpBack />
                </Button>
              )}
            </CardHeader>
            <Divider />
            <CardBody className="custom-scrollbar px-0 py-0">
              {arcadeId > 0 && detailArcade?.store_name ? (
                <ArcadeDetail arcadeId={arcadeId} />
              ) : nearbyArcades.length > 0 ? (
                <ArcadeList arcadeList={nearbyArcades} />
              ) : (
                <p className="w-full text-xl p-5 text-stone-600">
                  在指定范围内没有找到机厅。别气馁啦！
                </p>
              )}
            </CardBody>
            {arcadeId && detailArcade && (
              <CardFooter>
                <PathButton
                  endAddress={detailArcade.store_address}
                  startLat={targetLat}
                  startLng={targetLng}
                >
                  查看路线
                </PathButton>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SideBox;
