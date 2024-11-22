"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Select, SelectItem } from "@nextui-org/select";
import { Skeleton } from "@nextui-org/skeleton";
import { useSession } from "next-auth/react";

import IconReturnDownBack from "@/components/icons/IconReturnDownBack";
import IconBxArrowToBottom from "@/components/icons/IconBxArrowToBottom";
import IconBxArrowFromBottom from "@/components/icons/IconBxArrowFromBottom";
import { useArcades, SortMethod } from "@/stores/useArcades";
import PathButton from "@/components/PathButton";
import { useMap } from "@/stores/useMap";
import ArcadeList from "@/components/ArcadeList";
import { useReviews } from "@/stores/useReviews";
import NewReviewButton from "@/components/NewReviewButton";
import IssueButton from "@/components/IssueButton";

function SideBox() {
  const { data: session } = useSession();
  const ArcadeDetail = dynamic(() => import("@/components/ArcadeDetail"), {
    loading: () => (
      <div className="w-full flex items-center gap-3">
        <div className="px-2 w-full flex flex-col gap-2">
          {/*TODO: make these into a component*/}
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
      <div
        className={`fixed bottom-[10%] left-0 transform translate-y-0 w-full h-[40%] transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-[90%]"
        }`}
      >
        <div className="flex items-center h-full">
          <Card
            isBlurred
            isFooterBlurred
            className={`flex w-full h-full overflow-y-auto rounded-top`}
            radius="none"
            shadow="md"
          >
            <CardHeader className="flex justify-between h-[10%]">
              <button className="h-3 fixed" onClick={toggleBox}>
                {isOpen ? (
                  <IconBxArrowToBottom className="h-[5%] top-[3%] fixed w-full" />
                ) : (
                  <IconBxArrowFromBottom className="h-[5%] top-[3%] fixed w-full" />
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
                  size="sm"
                  variant="bordered"
                  onClick={() => {
                    params.delete("arcadeId");
                    replace(`${pathname}?${params.toString()}`);
                  }}
                >
                  <IconReturnDownBack />
                </Button>
              )}
            </CardHeader>
            <Divider />
            <CardBody className="px-0 py-0">
              {arcadeId > 0 && detailArcade?.store_name ? (
                <ArcadeDetail
                  arcadeDetail={detailArcade}
                  arcadeReviews={arcadeReviews}
                  session={session}
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
              <CardFooter className="min-h-12 max-h-12 flex items-center gap-2 border-t-1 border-gray-400">
                <div className="ml-0">
                  <IssueButton arcadeId={arcadeId}>信息有误</IssueButton>
                </div>
                <PathButton
                  endAddress={detailArcade.store_address}
                  startLat={targetLat}
                  startLng={targetLng}
                >
                  查看路线
                </PathButton>
                <NewReviewButton session={session} />
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SideBox;
