"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoReturnUpBack } from "react-icons/io5";

import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";

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

  useEffect(() => {
    async function fetchArcades() {
      const res = await fetch(
        `/api/arcades/get?lat=${lat}&lng=${lng}&range=${range}`,
      );
      const result = await res.json();
      if (detailId) {
        const detail = result.find((element) => {
          return Number(element.id) === Number(detailId);
        });
        if (detail) {
          setArcadeDetail(detail);
          setIsBoxOpen(true);
        } else {
          params.delete("detailId");
          replace(`${pathname}?${params.toString()}`);
        }
      } else {
        setArcadeList(result);
      }
    }
    fetchArcades();
  }, [lat, lng, range, detailId]);

  const [isBoxOpen, setIsBoxOpen] = useState(false);

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
              <p className="text-xl">机厅列表</p>
            )}
            {detailId && (
              <Button
                onClick={() => {
                  params.delete("detailId");
                  replace(`${pathname}?${params.toString()}`);
                }}
                isIconOnly
                className="ml-auto"
              >
                <IoReturnUpBack />
              </Button>
            )}
          </CardHeader>
          <Divider />
          <CardBody className="custom-scrollbar px-0 py-0">
            {detailId ? (
              <ul className="left-4 pt-2">
                <li className="text-2xl text-stone-950 py-1 px-1">
                  {arcadeDetail.store_name}
                </li>
                <li className="text-xl text-stone-800 py-1 px-1">
                  地址：{arcadeDetail.store_address}
                </li>
              </ul>
            ) : (
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
                  </Card>
                ))}
              </ul>
            )}
          </CardBody>
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
