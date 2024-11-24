import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Textarea } from "@nextui-org/input";
import { useEffect, useState } from "react";

import UpdateReviewButton from "@/components/UpdateReviewButton";
import { formatReadableDate } from "@/lib/utils";
import { review } from "@/types/reviews";

function UserReviews({ session }) {
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      const res = await fetch(
        `/api/reviews/get/byUserId?id=${session.user.id}`,
      );

      if (res.status !== 200) setError(true);
      const reviews = await res.json();

      setReviews(reviews);
    }
    fetchReviews();
  }, []);

  if (error) return <p>Unknown Error Happened.</p>;
  if (reviews.length === 0) return <p>未找到你的评论！</p>;

  return (
    <div className="h-64 overflow-y-scroll">
      {reviews.map((review: review) => (
        <Card
          key={review._id.toString()}
          isBlurred
          className="py-1"
          radius="none"
          shadow="sm"
        >
          <CardHeader className="flex flex-row items-center justify-between my-0 pt-2 pb-1">
            <p className="text-sm opacity-40">
              在 {review.store_id} 机厅下方的评论
            </p>
            <UpdateReviewButton
              originComment={review.comment}
              originRating={review.rating}
              originReviewId={review._id}
              session={session}
            />
          </CardHeader>
          <CardBody className="py-1">
            <Textarea
              isReadOnly
              defaultValue={review.comment}
              description={formatReadableDate(review.created_at)}
              label={`评分：${review.rating.toFixed(2)} / 5.00`}
              labelPlacement="inside"
              variant="faded"
            />
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

export default UserReviews;
