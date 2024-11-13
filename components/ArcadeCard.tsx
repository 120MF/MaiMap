"use client";

import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { arcade } from "@/types/arcades";

interface ArcadeCardProps {
  arcade: arcade;
}

function ArcadeCard({ arcade }: ArcadeCardProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <Card
      key={arcade.store_id}
      fullWidth
      isHoverable
      isPressable
      isBlurred={true}
      radius={"none"}
      onPress={() => {
        const params = new URLSearchParams(searchParams);

        params.set("arcadeId", String(arcade.store_id));
        replace(`${pathname}?${params.toString()}`);
      }}
    >
      <CardBody>
        <ul className="px-2">
          <li className="text-xl py-1 px-1">{arcade.store_name}</li>
          <li className="text-sm py-1 px-1">{arcade.store_address}</li>
        </ul>
      </CardBody>
      <CardFooter className="flex justify-end">
        <p className="text-sm">
          直线距离:
          {(arcade.distance / 1000).toFixed(4)}
          km
        </p>
      </CardFooter>
    </Card>
  );
}

export default ArcadeCard;
