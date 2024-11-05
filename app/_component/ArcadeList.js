import React from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function ArcadeList({ arcadeList }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <ul>
      {arcadeList.map((arcade) => (
        <Card
          fullWidth
          key={arcade.store_id}
          isBlurred={true}
          radius={"none"}
          isPressable
          isHoverable
          onPress={() => {
            const params = new URLSearchParams(searchParams);
            params.set("detailId", arcade.store_id);
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
  );
}

export default ArcadeList;
