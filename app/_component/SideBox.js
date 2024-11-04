"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoReturnUpBack } from "react-icons/io5";

import { Button } from "@nextui-org/react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider, SelectItem } from "@nextui-org/react";
import { Select } from "@nextui-org/select";

import pinyin from "pinyin";
import PathButton from "@/app/_component/PathButton";

function SideBox() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const lat = searchParams.get("lat") || 39.909333;
  const lng = searchParams.get("lng") || 116.397183;
  const range = searchParams.get("range") || 40;
  const detailId = searchParams.get("detailId") || null;

  const [arcadeList, setArcadeList] = useState([]);
  const [arcadeDetail, setArcadeDetail] = useState({});
  const [sortMethod, setSortMethod] = useState("");
  const [isBoxOpen, setIsBoxOpen] = useState(false);

  useEffect(() => {
    async function fetchArcades() {
      const res = await fetch(
        `/api/arcades/nearby?lat=${lat}&lng=${lng}&distance=${range}`,
      );
      const result = await res.json();

      setArcadeList(result);
      setSortMethod("");
    }
    fetchArcades();
  }, [lat, lng, range]);

  useEffect(() => {
    if (detailId) {
      const detail = arcadeList.find((element) => {
        return Number(element.id) === Number(detailId);
      });
      if (detail) {
        setArcadeDetail(detail);
        setIsBoxOpen(true);
      }
    }
  }, [detailId, arcadeList]);

  useEffect(() => {
    if (sortMethod === "按距离") {
      let tempList = [...arcadeList];
      tempList.sort((a, b) => a.distance - b.distance);
      setArcadeList(tempList);
    } else if (sortMethod === "按首字母") {
      let tempList = [...arcadeList];
      tempList.sort((a, b) => {
        const pinyinA = pinyin(a.store_name, {
          style: pinyin.STYLE_FIRST_LETTER,
        }).join("");

        const pinyinB = pinyin(b.store_name, {
          style: pinyin.STYLE_FIRST_LETTER,
        }).join("");
        return pinyinA.localeCompare(pinyinB);
      });
      setArcadeList(tempList);
    }
  }, [lat, lng, sortMethod]);

  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 z-10 transition-width duration-200 ${
        isBoxOpen ? "w-[22rem]" : "w-[2rem]"
      }`}
    >
      <div className="flex items-center">
        <Card
          isBlurred={true}
          className={`flex max-w-[20rem] h-[40rem] transition-transform duration-200 ${
            isBoxOpen ? "translate-x-0" : "-translate-x-full"
          } overflow-y-auto opacity-80`}
        >
          <CardHeader className="flex justify-between items-center h-14">
            {detailId ? (
              <p className="text-xl">机厅详情</p>
            ) : (
              <>
                <p className="text-xl">机厅列表</p>
                <Select
                  className="max-w-40"
                  variant="underlined"
                  label="排序方式"
                  defaultSelectedKeys=""
                  selectedKeys={[sortMethod]}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setSortMethod(e.target.value);
                  }}
                >
                  <SelectItem key="按距离">按距离</SelectItem>
                  <SelectItem key="按首字母">按首字母</SelectItem>
                </Select>
              </>
            )}
            {detailId && (
              <Button
                onClick={() => {
                  params.delete("detailId");
                  replace(`${pathname}?${params.toString()}`);
                }}
                isIconOnly
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
            {detailId && arcadeDetail.store_name ? (
              <>
                <ul className="left-4 pt-2">
                  <li className="text-2xl text-stone-950 py-1 px-1">
                    {arcadeDetail.store_name}
                  </li>
                  <li className="text-xl text-stone-800 py-1 px-1">
                    地址：{arcadeDetail.store_address}
                  </li>
                </ul>
              </>
            ) : arcadeList.length > 0 ? (
              <ul>
                {arcadeList.map((arcade) => (
                  <Card
                    fullWidth
                    key={arcade.id}
                    isBlurred={true}
                    radius={"none"}
                    isPressable
                    isHoverable
                    onPress={() => {
                      const params = new URLSearchParams(searchParams);
                      params.set("detailId", arcade.id);
                      replace(`${pathname}?${params.toString()}`);
                    }}
                  >
                    <CardBody>
                      <ul className="px-2">
                        <li className="text-xl text-stone-950 py-1 px-1">
                          {arcade.store_name}
                        </li>
                        <li className="text-xs text-stone-800 py-1 px-1">
                          {arcade.store_address}
                        </li>
                      </ul>
                    </CardBody>
                    <CardFooter className="flex justify-end">
                      <p className="text-sm text-stone-700">
                        直线距离:
                        {(arcade.distance / 1000).toFixed(4)}
                        km
                      </p>
                    </CardFooter>
                  </Card>
                ))}
              </ul>
            ) : (
              <p className="w-full text-xl p-5 text-stone-600">
                在指定范围内没有找到机厅。别气馁啦！
              </p>
            )}
          </CardBody>
          {detailId && (
            <CardFooter>
              <PathButton
                endAddress={arcadeDetail.store_address}
                startLat={lat}
                startLng={lng}
              >
                查看路线
              </PathButton>
            </CardFooter>
          )}
        </Card>
        <Button
          onClick={() => setIsBoxOpen((state) => !state)}
          className={`flex rounded-right h-10`}
          isIconOnly
          color={"primary"}
          size={"md"}
          // radius={"none"}
        >
          {isBoxOpen ? (
            <IoIosArrowBack size={30} />
          ) : (
            <IoIosArrowForward size={30} />
          )}
        </Button>
      </div>
    </div>
  );
}

export default SideBox;
