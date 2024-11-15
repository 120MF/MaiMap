import { Input, Textarea } from "@nextui-org/input";
import { TbMailFilled } from "react-icons/tb";
import { Checkbox } from "@nextui-org/checkbox";
import { FaRegUserCircle } from "react-icons/fa";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { TbCoinYuan } from "react-icons/tb";
import { FaCoins } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { Button } from "@nextui-org/button";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  email: string;
  showEmail: boolean;
  username: string;
  rating: number;
  arcade_count: number;
  coin_price: number;
  pc_coin_count: number;
  comment: string;
}
function NewReviewForm({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="pb-1">个人信息</h2>
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
            startContent={<TbMailFilled />}
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
          {...register("showEmail")}
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
            startContent={<FaRegUserCircle />}
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
              pattern: /^[1-30]$/i,
            })}
            isRequired
            label="机台数"
            placeholder="1P+2P=1台舞萌"
            size="sm"
            startContent={<CgSmartHomeWashMachine />}
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
            startContent={<TbCoinYuan />}
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
            startContent={<FaCoins />}
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
            startContent={<FaRegStar />}
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
      <Button fullWidth color="primary" type="submit">
        提交
      </Button>
    </form>
  );
}

export default NewReviewForm;
