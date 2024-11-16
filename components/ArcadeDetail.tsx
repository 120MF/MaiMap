import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import { Textarea } from "@nextui-org/input";
import { User } from "@nextui-org/user";

import { review } from "@/types/reviews";
import { arcade } from "@/types/arcades";
import { getAverage, getMostFrequent } from "@/lib/utils";

interface ArcadeDetailPageProps {
  arcadeDetail: arcade;
  arcadeReviews: review[];
}
function ArcadeDetail({ arcadeDetail, arcadeReviews }: ArcadeDetailPageProps) {
  const averageRating = getAverage<review>(arcadeReviews, "rating");
  const arcadeCount = getMostFrequent<review>(arcadeReviews, "arcade_count");
  const coinPrice = getMostFrequent<review>(arcadeReviews, "coin_price");
  const pcPrice = getMostFrequent<review>(arcadeReviews, "pc_coin_count");

  return (
    <div className="custom-scrollbar overflow-y-auto left-4">
      <Card fullWidth isBlurred radius="none" shadow="sm">
        <h2 className="text-2xl pl-4 pt-4">{arcadeDetail.store_name}</h2>
        <p className="text-xl pl-4 pt-2 pb-4">{arcadeDetail.store_address}</p>
        <Divider />
        <h2 className="text-xl pl-4 pt-2">机厅信息</h2>
        <span className="flex flex-row justify-start gap-4 pl-4 pt-2">
          <Chip
            color={
              averageRating < 1.5
                ? "warning"
                : averageRating < 3.5
                  ? "primary"
                  : "success"
            }
            variant="faded"
          >
            平均评分：{averageRating.toFixed(2)} / 5.00
          </Chip>
          <Chip
            color={
              // @ts-ignore
              arcadeCount < 2
                ? "warning"
                : // @ts-ignore
                  arcadeCount < 5
                  ? "primary"
                  : "success"
            }
            variant="faded"
          >
            机台数：{arcadeCount}
          </Chip>
        </span>
        <span className="flex flex-row justify-start gap-4 pl-4 py-2">
          <Chip
            variant="faded"
            color={
              // @ts-ignore
              coinPrice > 1
                ? "warning"
                : // @ts-ignore
                  coinPrice > 0.7
                  ? "primary"
                  : "success"
            }
          >
            机厅币价：{coinPrice} 元
          </Chip>
          <Chip
            color={
              // @ts-ignore
              pcPrice > 5
                ? "warning"
                : // @ts-ignore
                  coinPrice > 3
                  ? "primary"
                  : "success"
            }
            variant="faded"
          >
            PC单价：
            {pcPrice} 币/局
          </Chip>
        </span>
      </Card>
      <Divider />
      <Card isBlurred radius="none" shadow="sm" fullWidth>
        <p className="text-xl py-2 pl-4">评论区</p>
      </Card>
      <div>
        {arcadeReviews.length > 0 ? (
          arcadeReviews.map((review: review) => (
            <Card
              key={review.review_id}
              className="py-1"
              isBlurred
              radius="none"
              shadow="sm"
            >
              <CardHeader className="flex flex-row items-center my-0 pt-2 pb-1">
                <User
                  name={review.username}
                  description={review.show_email ? review.email : "匿名邮箱"}
                  avatarProps={{ showFallback: true }}
                />
              </CardHeader>
              <CardBody className="py-1">
                <Textarea
                  isReadOnly
                  defaultValue={review.comment}
                  label={`评分：${review.rating.toFixed(2)} / 5.00`}
                  labelPlacement="inside"
                  variant="faded"
                />
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
