import { Input, Textarea } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import { Button } from "@nextui-org/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, Bounce } from "react-toastify";
import { useTheme } from "next-themes";
import { useState } from "react";

import { review } from "@/types/reviews";
import { useArcades } from "@/stores/useArcades";
import { useReviews } from "@/stores/useReviews";
import Icon388Mail from "@/components/icons/Icon388Mail";
import IconBxUserCircle from "@/components/icons/IconBxUserCircle";
import IconSmartHomeWashMachine from "@/components/icons/IconSmartHomeWashMachine";
import IconCurrencyYuan from "@/components/icons/IconCurrencyYuan";
import IconCoins from "@/components/icons/IconCoins";
import IconStar from "@/components/icons/IconStar";

interface IFormInput extends review {
  email: string;
  show_email: boolean;
  username: string;
  rating: number;
  arcade_count: number;
  coin_price: number;
  pc_coin_count: number;
  comment: string;
}
function NewReviewForm({ onClose }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const { theme } = useTheme();
  const arcadeId = useArcades((state) => state.arcadeId);
  const fetch_currentReviews = useReviews(
    (state) => state.fetch_currentReviews,
  );
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    const value: review = { ...data, store_id: arcadeId };
    const res = await fetch("/reviews/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    if (res.status !== 200) {
      toast.success("评论上传失败", {
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="pb-1 text-sm text-center italic underline text-red-400">
        请避免在评论中留下个人敏感信息！
      </p>
      <h2>个人信息</h2>
      <div className="flex flex-row items-center pb-1">
        <div className="flex flex-col items-start max-w-[50%]">
          <Input
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
            })}
            isRequired
            label="电子邮箱"
            placeholder="you@example.com"
            size="sm"
            startContent={<Icon388Mail />}
            type="email"
            variant="bordered"
          />
          {errors?.email?.type === "required" && (
            <p className="text-red-400 text-xs pl-2">请输入电子邮箱</p>
          )}
          {errors?.email?.type === "pattern" && (
            <p className="text-red-400 text-xs pl-2">请输入正确的电子邮箱</p>
          )}
        </div>
        <Checkbox
          {...register("show_email")}
          defaultSelected
          className="ml-4 max-w-[50%]"
          color="primary"
        >
          展示电子邮箱
        </Checkbox>
      </div>
      <div className="flex flex-row items-center pb-1">
        <div className="flex flex-col items-start w-full">
          <Input
            {...register("username", { required: true })}
            fullWidth
            isRequired
            label="用户名"
            placeholder="迪拉熊"
            size="sm"
            startContent={<IconBxUserCircle />}
            variant="bordered"
          />
          {errors?.username?.type === "required" && (
            <p className="text-red-400 text-xs pl-2">请输入用户名</p>
          )}
        </div>
        {/*<span>*/}
        {/*  可使用*/}
        {/*  <Link isExternal href="https://cravatar.com/" showAnchorIcon>*/}
        {/*    Cravatar头像*/}
        {/*  </Link>*/}
        {/*</span>*/}
      </div>
      <h2 className="pb-1">机厅信息</h2>
      <div className="flex flex-row items-center justify-evenly pb-1">
        <div className="flex flex-col items-start">
          <Input
            {...register("arcade_count", {
              required: true,
              pattern: /^(30|2[1-9]|1[1-9]|[1-9])$/,
            })}
            isRequired
            label="机台数"
            placeholder="1P+2P=1台舞萌"
            size="sm"
            startContent={<IconSmartHomeWashMachine />}
            type="number"
            variant="bordered"
          />
          {errors?.arcade_count?.type === "required" && (
            <p className="text-red-400 text-xs pl-2">请输入机台数</p>
          )}
          {errors?.arcade_count?.type === "pattern" && (
            <p className="text-red-400 text-xs pl-2">请输入0至30的整数</p>
          )}
        </div>
        <div className="flex flex-col items-start">
          <Input
            {...register("coin_price", { pattern: /^(10|[0-9](\.[0-9]+)?)$/ })}
            label="币价（元/枚）"
            placeholder="0.00"
            size="sm"
            startContent={<IconCurrencyYuan />}
            type="number"
            variant="bordered"
          />
          {errors?.coin_price?.type === "pattern" && (
            <p className="text-red-400 text-xs pl-2">请输入正确的人民币价格</p>
          )}
        </div>
      </div>
      <div className="flex flex-row items-center justify-evenly pb-1">
        <div className="flex flex-col items-start">
          <Input
            {...register("pc_coin_count", {
              required: true,
              pattern: /^[0-10]$/i,
            })}
            isRequired
            label="单局所需币数"
            labelPlacement="inside"
            placeholder="0"
            size="sm"
            startContent={<IconCoins />}
            type="number"
            variant="bordered"
          />
          {errors?.pc_coin_count?.type === "required" && (
            <p className="text-red-400 text-xs pl-2">请输入单局所需币数</p>
          )}
          {errors?.pc_coin_count?.type === "pattern" && (
            <p className="text-red-400 text-xs pl-2">请输入0~10之间的整数</p>
          )}
        </div>
        <div className="flex flex-col items-start">
          <Input
            {...register("rating", { required: true, pattern: /^[1-5]$/i })}
            isRequired
            label="你的评分"
            placeholder="1~5分"
            size="sm"
            startContent={<IconStar />}
            type="number"
            variant="bordered"
          />
          {errors?.rating?.type === "required" && (
            <p className="text-red-400 text-xs pl-2">请输入你的评分</p>
          )}
          {errors?.rating?.type === "pattern" && (
            <p className="text-red-400 text-xs pl-2">请输入0~5之间的整数</p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start">
        <Textarea
          {...register("comment", { required: true })}
          fullWidth
          isRequired
          className="pb-2"
          label="文字评论"
          placeholder="在这里写下你对机厅的评价吧……"
          variant="bordered"
        />
        {errors?.comment?.type === "required" && (
          <p className="text-red-400 text-xs pl-2">请输入你的评价</p>
        )}
      </div>
      <Button
        fullWidth
        color="primary"
        isLoading={isLoading}
        type="submit"
        onPress={() => {
          if (!errors) onClose();
        }}
      >
        提交
      </Button>
    </form>
  );
}

export default NewReviewForm;
