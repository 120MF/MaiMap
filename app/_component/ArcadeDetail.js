import React, { useEffect, useState } from "react";

import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import getMostFrequent from "@/app/_lib/getMostFrequentProperty";
import getAverage from "@/app/_lib/getAverage";

function ArcadeDetail({ arcadeDetail }) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    async function fetchReviews() {
      const res = await fetch(
        `/api/reviews/get?store_id=${arcadeDetail.store_id}`,
      );
      const data = await res.json();
      setReviews(data);
    }
    fetchReviews();
  }, []);

  return (
    <div className="left-4 pt-2">
      <h2 className="text-2xl text-stone-950 py-1 px-1">
        {arcadeDetail.store_name}
      </h2>
      <p className="text-xl text-stone-800 py-2 px-2">
        {arcadeDetail.store_address}
      </p>
      <p>机厅信息</p>
      <span className="flex">
        <p>平均评分：{getAverage(reviews, "rating")}</p>
        <p className="px-2">
          机台数：{getMostFrequent(reviews, "arcade_count")}
        </p>
      </span>
      <p>
        机厅币价：{getMostFrequent(reviews, "coin_price")} PC单价：
        {getMostFrequent(reviews, "pc_coin_count")}
      </p>
      <Divider />
      <div className="flex justify-between">
        <p className="text-xl text-stone-800 py-2 px-1">评论区</p>
        <Button>新建评论</Button>
      </div>
      <div>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Card key={review.review_id}>
              <CardHeader className="flex flex-col items-start my-0 py-1">
                <p className="text-md text-stone-800 py-1 px-1">
                  {review.username}
                </p>
                <span className="flex">
                  <p className="text-sm text-stone-800 py-1 px-1">
                    {review.email}
                  </p>
                  <p>评分:{review.rating}</p>
                </span>
              </CardHeader>
              <CardBody>
                <p>{review.comment}</p>
              </CardBody>
            </Card>
          ))
        ) : (
          <p>暂无评论</p>
        )}
      </div>
    </div>
  );
}

export default ArcadeDetail;
