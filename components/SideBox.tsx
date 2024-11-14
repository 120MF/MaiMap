"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

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
import { useReviews } from "@/stores/useReviews";
import { Skeleton } from "@nextui-org/skeleton";

function SideBox() {
  const ArcadeDetail = dynamic(() => import("@/components/ArcadeDetail"), {
    loading: () => (
      <div className="w-full flex items-center gap-3">
        <div className="px-2 w-full flex flex-col gap-2">
          <Skeleton className="h-5 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
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
  const fetch_nearby_arcade = useArcades((state) => state.fetch_nearby_arcade);
  const range = useMap((state) => state.range);
  const sortMethod: string = sortMethodToChineseString(
    useArcades((state) => state.sortMethod),
  );
  const update_sortMethod = useArcades((state) => state.update_sortMethod);

  function toggleBox() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (arcadeId > 0) setIsOpen(true);
  }, [arcadeId]);

  return (
    <div className="relative z-20">
      <Button
        color="primary"
        onClick={toggleBox}
        className="fixed bottom-[12%] right-4"
        isIconOnly
      >
        <FaList />
      </Button>

      {/* 侧边栏 */}
      <div
        className={`fixed top-[24%] left-0 transform -translate-y-1/2 w-[80%] h-[35%] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-[-100%]"
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
                  variant="bordered"
                  className="ml-auto"
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
