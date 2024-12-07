import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import { Textarea } from "@nextui-org/input";
import { Session } from "next-auth";

import { review } from "@/types/reviews";
import { arcade } from "@/types/arcades";
import { formatReadableDate, getAverage } from "@/lib/utils";
import UserCard from "@/components/UserCard";
import UpdateReviewButton from "@/components/UpdateReviewButton";
import { tag } from "@/types/tags";
import NewTagButton from "@/components/DrawerBoxComponents/NewTagButton";
import ArcadeTag from "@/components/DrawerBoxComponents/ArcadeTag";

interface ArcadeDetailPageProps {
  arcadeDetail: arcade;
  arcadeReviews: review[];
  arcadeTags: tag[];
  session: Session;
}
function ArcadeDetail({
  session,
  arcadeDetail,
  arcadeReviews,
  arcadeTags,
}: ArcadeDetailPageProps) {
  const averageRating = getAverage<review>(arcadeReviews, "rating") || -1;
  const arcadeCount = arcadeDetail.store_arcade_count || -1;
  const coinPrice = arcadeDetail.store_coin_price || -1;
  const pcPrice = arcadeDetail.store_pc_coin_count || -1;

  return (
    <div className="custom-scrollbar overflow-y-auto left-4">
      <Card fullWidth isBlurred radius="none" shadow="sm">
        <h2 className="text-2xl pl-4 pt-4">{arcadeDetail.store_name}</h2>
        <p className="text-lg pl-4 pt-2 pb-4">{arcadeDetail.store_address}</p>
        <>
          <h2 className="text-2xl pl-4 py-1">机厅信息</h2>
          <span className="flex flex-row justify-start gap-4 pl-4 pt-2">
            <Chip
              color={
                averageRating === -1
                  ? "default"
                  : averageRating < 1.5
                    ? "warning"
                    : averageRating < 3.5
                      ? "primary"
                      : "success"
              }
              variant="faded"
            >
              平均评分：
              {averageRating === -1
                ? "暂无"
                : `${averageRating.toFixed(2)} / 5.00`}
            </Chip>
            <Chip
              color={
                arcadeCount === -1
                  ? "default"
                  : arcadeCount < 2
                    ? "warning"
                    : arcadeCount < 5
                      ? "primary"
                      : "success"
              }
              variant="faded"
            >
              机台数：{arcadeCount === -1 ? "未知" : arcadeCount}
            </Chip>
          </span>
          <span className="flex flex-row justify-start gap-4 pl-4 py-2">
            <Chip
              color={
                coinPrice === -1
                  ? "default"
                  : coinPrice > 1
                    ? "warning"
                    : coinPrice > 0.7
                      ? "primary"
                      : "success"
              }
              variant="faded"
            >
              最低币价：{coinPrice === -1 ? "未知" : `${coinPrice} 元`}
            </Chip>
            <Chip
              color={
                pcPrice === -1
                  ? "default"
                  : pcPrice > 5
                    ? "warning"
                    : coinPrice > 3
                      ? "primary"
                      : "success"
              }
              variant="faded"
            >
              PC单价：
              {pcPrice === -1 ? "未知" : `${pcPrice} 币/局`}
            </Chip>
            {arcadeDetail.arcade_dead && (
              <Chip color="warning" variant="faded">
                已停业
              </Chip>
            )}
          </span>
          <Divider />
          <h2 className="text-xl pl-4 pt-2">机厅标签</h2>
          <div className="flex flex-wrap justify-start gap-4 pl-4 py-2">
            {arcadeTags.map((tag) => (
              <ArcadeTag
                key={String(tag._id)}
                arcadeId={arcadeDetail.store_id}
                session={session}
                tag={tag}
              />
            ))}
            <NewTagButton session={session} store_id={arcadeDetail.store_id} />
          </div>
        </>
      </Card>
      {arcadeReviews.length > 0 ? (
        <>
          <Divider />
          <Card fullWidth isBlurred radius="none" shadow="sm">
            <p className="text-xl py-2 pl-4">评论区</p>
          </Card>
          <div>
            {arcadeReviews.map((review: review) => (
              <Card
                key={review._id.toString()}
                isBlurred
                className="py-1"
                radius="none"
                shadow="sm"
              >
                <CardHeader className="flex flex-row items-center justify-between my-0 pt-2 pb-1">
                  {/*TODO: add a thumb-up button here to vote*/}
                  <UserCard user={null} userId={review.user_id} />
                  {String(review.user_id) === session?.user?.id ? (
                    <UpdateReviewButton
                      originComment={review.comment}
                      originRating={review.rating}
                      originReviewId={review._id}
                      session={session}
                    />
                  ) : null}
                </CardHeader>
                <CardBody className="py-1">
                  <Textarea
                    isReadOnly
                    defaultValue={
                      review.comment.length > 0
                        ? review.comment
                        : "该用户没有留下文字评论"
                    }
                    description={formatReadableDate(review.created_at)}
                    label={`评分：${review.rating.toFixed(2)} / 5.00`}
                    labelPlacement="inside"
                    variant="faded"
                  />
                </CardBody>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center pt-3 text-md opacity-50">
          点击右下角的按钮来新增一条评论……
        </p>
      )}
    </div>
  );
}

export default ArcadeDetail;
