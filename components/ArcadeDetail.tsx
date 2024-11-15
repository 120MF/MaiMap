import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

import { review } from "@/types/reviews";
import { arcade } from "@/types/arcades";
import { getAverage, getMostFrequent } from "@/lib/utils";

interface ArcadeDetailPageProps {
  arcadeDetail: arcade;
  arcadeReviews: review[];
}
function ArcadeDetail({ arcadeDetail, arcadeReviews }: ArcadeDetailPageProps) {
  return (
    <div className="custom-scrollbar overflow-y-auto left-4 pt-2">
      <h2 className="text-2xl py-1 px-1">{arcadeDetail.store_name}</h2>
      <p className="text-xl py-2 px-2">{arcadeDetail.store_address}</p>
      <p>机厅信息</p>
      <span className="flex flex-row justify-start gap-4">
        <p>
          平均评分：{getAverage<review>(arcadeReviews, "rating").toFixed(2)} /
          5.00
        </p>
        <p className="">
          机台数：{getMostFrequent<review>(arcadeReviews, "arcade_count")}
        </p>
      </span>
      <span className="flex flex-row justify-start gap-4">
        <p>
          机厅币价：{getMostFrequent<review>(arcadeReviews, "coin_price")} 元
        </p>
        <p>
          PC单价：
          {getMostFrequent<review>(arcadeReviews, "pc_coin_count")} 币/局
        </p>
      </span>
      <Divider />
      <div className="flex justify-between">
        <p className="text-xl py-2 px-1">评论区</p>
      </div>
      <div>
        {arcadeReviews.length > 0 ? (
          arcadeReviews.map((review: review) => (
            <Card key={review.review_id} radius="none" shadow="md">
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
