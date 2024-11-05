import React from "react";
import { Divider } from "@nextui-org/divider";

function ArcadeDetail({ arcadeDetail }) {
  return (
    <div className="left-4 pt-2">
      <h2 className="text-2xl text-stone-950 py-1 px-1">
        {arcadeDetail.store_name}
      </h2>
      <p className="text-xl text-stone-800 py-2 px-2">
        {arcadeDetail.store_address}
      </p>
      <Divider />
      <p className="text-md text-stone-600 py-2 px-1">在这里留下你的评论吧……</p>
      <p className="text-md text-stone-600 py-2 px-1">个人信息</p>
    </div>
  );
}

export default ArcadeDetail;
