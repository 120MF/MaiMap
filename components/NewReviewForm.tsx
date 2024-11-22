import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Rating } from "@smastrom/react-rating";
import { toast, Bounce } from "react-toastify";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { review } from "@/types/reviews";
import { useArcades } from "@/stores/useArcades";
import { useReviews } from "@/stores/useReviews";

function NewReviewForm({ session, onClose }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(-1);
  const [onSubmit, setOnSubmit] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [ratingError, setRatingError] = useState(false);

  useEffect(() => {
    async function postReview() {
      const value = {
        user_id: session.user.id,
        comment: comment,
        rating: rating,
        store_id: arcadeId,
      } as review;
      const res = await fetch("/api/reviews/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      if (res.status !== 200) {
        toast.error("评论上传失败", {
          position: "top-right",
          type: "error",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme,
          transition: Bounce,
        });
      } else {
        toast.success("评论上传成功", {
          position: "top-right",
          autoClose: 3000,
          type: "success",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme,
          transition: Bounce,
        });
      }

      setIsLoading(false);
      fetch_currentReviews(arcadeId);
      onClose();
    }
    if (onSubmit) {
      setIsLoading(true);
      setRatingError(rating === -1);
      setCommentError(comment.length < 10);
      // State为Batch Update,不能在Effect中直接判断ratingError的值
      if (rating !== -1 && comment.length > 10) {
        postReview();
      }

      setIsLoading(false);
      setOnSubmit(false);
    }
  }, [onSubmit]);
  const { theme } = useTheme();
  const arcadeId = useArcades((state) => state.arcadeId);
  const fetch_currentReviews = useReviews(
    (state) => state.fetch_currentReviews,
  );
  // const onSubmit: SubmitHandler<IFormInput> = async (data) => {
  //   setIsLoading(true);
  //   const value: review = { ...data, store_id: arcadeId };
  //   const res = await fetch("/api/reviews/post", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(value),
  //   });
  //
  //   if (res.status !== 200) {
  //     toast.error("评论上传失败", {
  //       position: "top-right",
  //       type: "error",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: theme,
  //       transition: Bounce,
  //     });
  //   } else {
  //     toast.success("评论上传成功", {
  //       position: "top-right",
  //       autoClose: 3000,
  //       type: "success",
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: theme,
  //       transition: Bounce,
  //     });
  //   }
  //
  //   setIsLoading(false);
  //   fetch_currentReviews(arcadeId);
  //   onClose();
  // };

  return (
    <div className="flex flex-col">
      <p className="pb-1 text-sm text-center italic underline text-red-500">
        请避免在评论中留下个人敏感信息！
      </p>
      <div className="py-2 w-[50%] mx-auto">
        <Rating className="h-10" value={rating} onChange={setRating} />
      </div>
      {ratingError ? (
        <p className="text-center text-xs text-red-500 pb-1 -mt-1">
          请填写评分
        </p>
      ) : null}

      <Textarea
        fullWidth
        className="pb-2"
        errorMessage="请填写大于10字以上的评论"
        isInvalid={commentError}
        label="文字评论"
        placeholder="在这里写下你对机厅的评价吧……"
        value={comment}
        variant="bordered"
        onValueChange={setComment}
      />
      <Button
        fullWidth
        color="primary"
        isLoading={isLoading}
        type="submit"
        onPress={() => {
          setOnSubmit(true);
        }}
      >
        提交
      </Button>
    </div>
  );
}

export default NewReviewForm;
