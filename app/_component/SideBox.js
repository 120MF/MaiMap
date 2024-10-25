"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
      className={`relative top-1/2 -translate-y-1/2 z-10 transition-width duration-200 ${
        isBoxOpen ? "w-[22rem]" : "w-[2rem]"
      }`}
    >
      <div className="relative flex items-center">
        <div
          className={`custom-scrollbar relative w-[20rem] h-[40rem] bg-blue-300 transition-transform duration-200 ${
            isBoxOpen ? "translate-x-0" : "-translate-x-full"
          } overflow-y-auto opacity-70`}
        >
          {detailId && (
            <button
              onClick={() => {
                params.delete("detailId");
                replace(`${pathname}?${params.toString()}`);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              X
            </button>
          )}
          {detailId ? (
            <ul className="left-4">
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
                <li
                  key={arcade.id}
                  className="m-2 border-t border-gray-500 pl-4"
                >
                  <li className="text-xl text-stone-950 py-1 px-1">
                    {arcade.store_name}
                  </li>
                  <li className="text-xs text-stone-800 py-1 px-1">
                    {arcade.store_address}
                  </li>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={() => setIsBoxOpen((state) => !state)}
          className={`absolute h-10 w-[1rem] bg-blue-400 text-gray-200 transition-transform duration-200 ${
            isBoxOpen ? "translate-x-[20rem]" : "left-0"
          } text-xs`}
        >
          {isBoxOpen ? "←" : "→"}
        </button>
      </div>
    </div>
  );
}

export default SideBox;
