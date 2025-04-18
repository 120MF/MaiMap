import { Card, CardBody, CardHeader } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Divider } from '@heroui/divider';
import { Textarea } from '@heroui/input';

import type { Arcade } from '@/types/arcades';
import type { Comment } from '@/types/comments';
import type { Tag } from '@/types/tags';

import arcadeDetail from '@/components/DrawerBoxComponents/ArcadeDetail.tsx';
import ArcadeTag from '@/components/DrawerBoxComponents/ArcadeTag';
import NewTagButton from '@/components/DrawerBoxComponents/NewTagButton';
import UpdateReviewButton from '@/components/UpdateReviewButton';
import UserCard from '@/components/UserCard';
import { getAverage, readFormattedDate } from '@/lib/utils';
import { useArcades } from '@/stores/useArcades.tsx';
import { useComments } from '@/stores/useComments.tsx';
import { useTags } from '@/stores/useTags.tsx';

function ArcadeDetail() {
  const { currentComments } = useComments();
  const { detailArcade } = useArcades();
  const { currentTags } = useTags();
  const averageRating: number =
    getAverage<Comment>(currentComments, 'rating') || -1;

  return (
    <div className="custom-scrollbar overflow-y-auto left-4">
      <Card fullWidth isBlurred radius="none" shadow="sm">
        <h2 className="text-2xl pl-4 pt-4">{detailArcade?.arcade_name}</h2>
        <p className="text-lg pl-4 pt-2 pb-4">{detailArcade?.arcade_address}</p>
        <>
          <h2 className="text-2xl pl-4 py-1">机厅信息</h2>
          <span className="flex flex-row justify-start gap-4 pl-4 pt-2">
            <Chip
              color={
                averageRating === -1
                  ? 'default'
                  : averageRating < 1.5
                    ? 'warning'
                    : averageRating < 3.5
                      ? 'primary'
                      : 'success'
              }
              variant="faded"
            >
              平均评分：
              {averageRating === -1
                ? '暂无'
                : `${averageRating.toFixed(2)} / 5.00`}
            </Chip>
            <Chip
              color={
                !detailArcade || !detailArcade.arcade_count
                  ? 'default'
                  : detailArcade.arcade_count < 2
                    ? 'warning'
                    : detailArcade.arcade_count < 5
                      ? 'primary'
                      : 'success'
              }
              variant="faded"
            >
              机台数：
              {!detailArcade || !detailArcade.arcade_count
                ? '未知'
                : detailArcade.arcade_count}
            </Chip>
          </span>
          <span className="flex flex-row justify-start gap-4 pl-4 py-2">
            <Chip
              color={
                !detailArcade || !detailArcade.arcade_cost
                  ? 'default'
                  : detailArcade.arcade_cost > 5
                    ? 'warning'
                    : 'primary'
              }
              variant="faded"
            >
              PC单价：
              {!detailArcade || !detailArcade.arcade_cost
                ? '未知'
                : `${detailArcade.arcade_cost} 币/局`}
            </Chip>
            {detailArcade?.arcade_dead && (
              <Chip color="warning" variant="faded">
                已停业
              </Chip>
            )}
          </span>
          <Divider />
          <h2 className="text-xl pl-4 pt-2">机厅标签</h2>
          <div className="flex flex-wrap justify-start gap-4 pl-4 py-2">
            {currentTags.map((tag) => (
              //   TODO: add user session
              <ArcadeTag
                key={tag.id}
                arcadeId={detailArcade?.arcade_id}
                tag={tag}
              />
            ))}
            {/*TODO: add user session */}
            {/*<NewTagButton />*/}
          </div>
        </>
      </Card>
      {currentComments.length > 0 ? (
        <>
          <Divider />
          <Card fullWidth isBlurred radius="none" shadow="sm">
            <p className="text-xl py-2 pl-4">评论区</p>
          </Card>
          <div>
            {currentComments.map((comment: Comment) => (
              <Card
                key={comment.id}
                isBlurred
                className="py-1"
                radius="none"
                shadow="sm"
              >
                <CardHeader className="flex flex-row items-center justify-between my-0 pt-2 pb-1">
                  {/*TODO: add a thumb-up button here to vote*/}
                  <UserCard user={null} userId={comment.user_id} />
                  {/*TODO: add update button*/}
                  {/*{String(comment.user_id) === session?.user?.id ? (*/}
                  {/*  <UpdateReviewButton*/}
                  {/*    originComment={comment.comment}*/}
                  {/*    originRating={comment.rating}*/}
                  {/*    originReviewId={comment._id}*/}
                  {/*    session={session}*/}
                  {/*  />*/}
                  {/*) : null}*/}
                </CardHeader>
                <CardBody className="py-1">
                  <Textarea
                    isReadOnly
                    defaultValue={
                      comment.comment.length > 0
                        ? comment.comment
                        : '该用户没有留下文字评论'
                    }
                    description={readFormattedDate(comment.created_at)}
                    label={`评分：${comment.rating.toFixed(2)} / 5.00`}
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
