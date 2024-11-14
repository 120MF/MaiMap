"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IoReturnUpBack } from "react-icons/io5";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Select, SelectItem } from "@nextui-org/select";
import { Skeleton } from "@nextui-org/skeleton";

import { useArcades, SortMethod } from "@/stores/useArcades";
import PathButton from "@/components/PathButton";
import { useMap } from "@/stores/useMap";
import ArcadeList from "@/components/ArcadeList";
import { useReviews } from "@/stores/useReviews";

function SideBox() {
  const ArcadeDetail = dynamic(() => import("@/components/ArcadeDetail"), {
    loading: () => (
      <div className="w-full flex items-center gap-3">
        <div className="px-2 w-full flex flex-col gap-2">
          <Skeleton className="h-6 w-9/12 rounded-lg" />
          <Skeleton className="h-4 w-11/12 rounded-lg" />
          <Skeleton className="h-4 w-11/12 rounded-lg" />
          <Skeleton className="h-4 w-11/12 rounded-lg" />
          <Skeleton className="h-4 w-11/12 rounded-lg" />
          <Skeleton className="h-4 w-11/12 rounded-lg" />
          <Skeleton className="h-4 w-11/12 rounded-lg" />
          <Skeleton className="h-4 w-11/12 rounded-lg" />
        </div>
      </div>
    ),
    ssr: true,
  });

  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const targetLat = useMap((state) => state.targetLat);
  const targetLng = useMap((state) => state.targetLng);

  const arcadeId = useArcades((state) => state.arcadeId);
  const detailArcade = useArcades((state) => state.detailArcade);
  const arcadeReviews = useReviews((state) => state.currentReviews);
  const nearbyArcades = useArcades((state) => state.nearbyArcades);
  const sortMethod: string =
    SortMethod[useArcades((state) => state.sortMethod)];
  const update_sortMethod = useArcades((state) => state.update_sortMethod);

  function toggleBox() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (arcadeId > 0) setIsOpen(true);
  }, [arcadeId]);

  return (
    <div className="relative z-20">
      {/* 侧边栏 */}
      <div
        className={`fixed bottom-[7%] left-0 transform translate-y-0 w-full h-[40%] transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-[90%]"
        }`}
      >
        <div className="flex items-center h-full">
          <Card className={`flex w-full h-full overflow-y-auto`} isBlurred>
            <CardHeader className="flex justify-between h-[10%]">
              <button className="h-3 fixed" onClick={toggleBox}>
                {isOpen ? (
                  <IoIosArrowDown className="h-[5%] top-[3%] fixed w-full" />
                ) : (
                  <IoIosArrowUp className="h-[5%] top-[3%] fixed w-full" />
                )}
              </button>
              {arcadeId > 0 ? (
                <p className="text-xl order-1 ml-2">机厅详情</p>
              ) : (
                <>
                  <p className="text-xl order-1 ml-2">机厅列表</p>
                  <Select
                    className="max-w-40 order-3 mr-2"
                    defaultSelectedKeys=""
                    label="排序方式"
                    labelPlacement="outside-left"
                    selectedKeys={[sortMethod]}
                    size="sm"
                    variant="underlined"
                    onChange={(e) => {
                      update_sortMethod(
                        SortMethod[e.target.value as keyof typeof SortMethod],
                      );
                      console.log(e.target.value);
                    }}
                  >
                    <SelectItem key="DistanceAscending">距离升序</SelectItem>
                    <SelectItem key="DistanceDescending">距离降序</SelectItem>
                    <SelectItem key="PinyinAscending">拼音升序</SelectItem>
                    <SelectItem key="PinyinDescending">拼音降序</SelectItem>
                    <SelectItem key="Default">默认</SelectItem>
                  </Select>
                </>
              )}

              {arcadeId > 0 && (
                <Button
                  isIconOnly
                  className="order-3 mr-2"
                  variant="bordered"
                  onClick={() => {
                    params.delete("arcadeId");
                    replace(`${pathname}?${params.toString()}`);
                  }}
                >
                  <IoReturnUpBack />
                </Button>
              )}
            </CardHeader>
            <Divider />
            <CardBody className="px-0 py-0">
              {arcadeId > 0 && detailArcade?.store_name ? (
                <ArcadeDetail
                  arcadeDetail={detailArcade}
                  arcadeReviews={arcadeReviews}
                />
              ) : nearbyArcades.length > 0 ? (
                <ArcadeList
                  arcadeList={nearbyArcades}
                  sortMethod={sortMethod}
                />
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
