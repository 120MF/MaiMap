import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

import { review } from "@/types/reviews";
import { getAverage, getMostFrequent } from "@/lib/utils";
import NewReviewButton from "@/components/NewReviewButton";

interface ArcadeDetailProps {
  arcadeId: number;
}

async function getArcadeDetail(id: number) {
  const res = await fetch(`/arcades/get/byId?id=${id}`);

  if (res.status !== 200) {
    throw new Error("fetch arcade failed");
  }

  return await res.json();
}

async function getArcadeReviews(id: number) {
  const res = await fetch(`/reviews/get/byId?id=${id}`);

  if (res.status !== 200) {
    throw new Error("fetch reviews failed");
  }

  return await res.json();
}

async function ArcadeDetail({ arcadeId }: ArcadeDetailProps) {
  const arcadeDetail = await getArcadeDetail(arcadeId);
  const arcadeReviews = await getArcadeReviews(arcadeId);

  return (
    <div className="left-4 pt-2">
      <h2 className="text-2xl py-1 px-1">{arcadeDetail.store_name}</h2>
      <p className="text-xl py-2 px-2">{arcadeDetail.store_address}</p>
      <p>机厅信息</p>
      <span className="flex">
        <p>平均评分：{getAverage<review>(arcadeReviews, "rating")}</p>
        <p className="px-2">
          机台数：{getMostFrequent<review>(arcadeReviews, "arcade_count")}
        </p>
      </span>
      <p>
        机厅币价：{getMostFrequent<review>(arcadeReviews, "coin_price")}{" "}
        PC单价：
        {getMostFrequent<review>(arcadeReviews, "pc_coin_count")}
      </p>
      <Divider />
      <div className="flex justify-between">
        <p className="text-xl py-2 px-1">评论区</p>
        <NewReviewButton />
      </div>
      <div>
        {arcadeReviews.length > 0 ? (
          arcadeReviews.map((review: review) => (
            <Card key={review.review_id}>
              <CardHeader className="flex flex-col items-start my-0 py-1">
                <p className="text-md py-1 px-1">{review.username}</p>
                <span className="flex">
                  <p className="text-sm py-1 px-1">{review.email}</p>
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
