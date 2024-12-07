import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Textarea } from "@nextui-org/input";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { toast } from "react-toastify";
import { ToastProps } from "react-toastify/dist/types";
import { useTheme } from "next-themes";

import { arcade } from "@/types/arcades";
import IconSmartHomeWashMachine from "@/components/icons/IconSmartHomeWashMachine";
import IconCoins from "@/components/icons/IconCoins";
import IconCurrencyYuan from "@/components/icons/IconCurrencyYuan";
import { useMap } from "@/stores/useMap";
import { toastStyle } from "@/lib/toastStyle";
import { useArcades } from "@/stores/useArcades";

export interface ArcadeFormInput {
  arcadeId: number;
  arcadeName: string;
  arcadeAddress: string;
  arcadeDead: boolean;
  arcadeCount: number | null;
  arcadeCoinPrice: number | null;
  arcadePcPrice: number | null;
  arcadeLat: number;
  arcadeLng: number;
}

interface ArcadeFormProps {
  arcadeDetail: arcade;
}

function EditArcadeForm({ arcadeDetail }: ArcadeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArcadeFormInput>();
  const { theme } = useTheme();
  const fetch_detailArcade = useArcades((state) => state.fetch_detailArcade);
  const onSubmit: SubmitHandler<ArcadeFormInput> = async (data) => {
    data.arcadeId = arcadeDetail.store_id;
    data.arcadeCount =
      String(data.arcadeCount) === "" ? null : Number(data.arcadeCount);
    data.arcadeCoinPrice =
      String(data.arcadeCoinPrice) === "" ? null : Number(data.arcadeCoinPrice);
    data.arcadePcPrice =
      String(data.arcadePcPrice) === "" ? null : Number(data.arcadePcPrice);
    data.arcadeLat = markLat === 0 ? arcadeLat : markLat;
    data.arcadeLng = markLng === 0 ? arcadeLng : markLng;
    console.log(data);
    const res = await fetch("/api/arcades/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status !== 200) {
      toast.error("机厅信息上传失败", {
        ...(toastStyle as ToastProps),
        type: "error",
        theme: theme,
      });
    } else {
      toast.success("机厅信息上传成功，即将刷新……", {
        ...(toastStyle as ToastProps),
        type: "success",
        theme: theme,
      });

      fetch_detailArcade(arcadeDetail.store_id);
      setIsMarking(false);
      setIsEditing(false);
      update_mark([0, 0]);

      setInterval(() => {
        window.location.reload();
      }, 1500);
    }
  };
  const [arcadeName, setArcadeName] = useState<string>(arcadeDetail.store_name);
  const [arcadeAddress, setArcadeAddress] = useState<string>(
    arcadeDetail.store_address,
  );
  const [arcadeCount, setArcadeCount] = useState(
    arcadeDetail.store_arcade_count,
  );
  const [arcadeCoinPrice, setArcadeCoinPrice] = useState(
    arcadeDetail.store_coin_price,
  );
  const [arcadePcPrice, setArcadePcPrice] = useState(
    arcadeDetail.store_pc_coin_count,
  );
  const [arcadeLat, setArcadeLat] = useState(arcadeDetail.store_lat);
  const [arcadeLng, setArcadeLng] = useState(arcadeDetail.store_lng);
  const [arcadeDead, setArcadeDead] = useState(arcadeDetail.arcade_dead);

  const isMarking = useMap((state) => state.isMarking);
  const setIsMarking = useMap((state) => state.setIsMarking);
  const setIsEditing = useMap((state) => state.setIsEditing);
  const markLat = useMap((state) => state.markLat);
  const markLng = useMap((state) => state.markLng);
  const update_mark = useMap((state) => state.update_mark);

  useEffect(() => {
    if (markLng !== 0 && markLat !== 0) {
      setArcadeLat(markLat);
      setArcadeLng(markLng);
    }
  }, [markLat, markLng]);

  return (
    <div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row justify-between gap-2">
          <div>
            <Textarea
              {...register("arcadeName", { required: true })}
              isRequired
              label="机厅名称"
              minRows={1}
              value={arcadeName}
              variant="bordered"
              onValueChange={setArcadeName}
            />
            {errors?.arcadeName?.type === "required" && (
              <p className="text-red-400 text-xs pl-2">请输入机厅名称</p>
            )}
          </div>
          <Checkbox
            {...register("arcadeDead", { required: false })}
            isRequired
            className="pr-6"
            isSelected={arcadeDead}
            onValueChange={setArcadeDead}
          >
            机厅已停业
          </Checkbox>
        </div>
        <Textarea
          {...register("arcadeAddress", { required: true })}
          isRequired
          label="机厅地址"
          minRows={1}
          value={arcadeAddress}
          variant="bordered"
          onValueChange={setArcadeAddress}
        />
        {errors?.arcadeAddress?.type === "required" && (
          <p className="text-red-400 text-xs pl-2">请输入机厅地址</p>
        )}
        <Input
          {...register("arcadeCount", {
            pattern: /^[1-4][0-9]$|^[5][0]$|^[1-9]$/,
          })}
          label="机台数量"
          placeholder="1P+2P=1台舞萌"
          startContent={<IconSmartHomeWashMachine />}
          type="number"
          //@ts-ignore
          value={arcadeCount}
          variant="bordered"
          //@ts-ignore
          onValueChange={setArcadeCount}
        />
        {errors?.arcadeCount?.type === "pattern" && (
          <p className="text-red-400 text-xs pl-2">请输入1至50的整数</p>
        )}
        <Input
          {...register("arcadeCoinPrice", {
            pattern: /^(10|[0-9](\.[0-9]+)?)$/,
          })}
          label="币价（元/枚）"
          placeholder="0.00"
          type="number"
          startContent={<IconCurrencyYuan />}
          //@ts-ignore
          value={arcadeCoinPrice}
          variant="bordered"
          //@ts-ignore
          onValueChange={setArcadeCoinPrice}
        />
        {errors?.arcadeCoinPrice?.type === "pattern" && (
          <p className="text-red-400 text-xs pl-2">请输入正确的人民币价格</p>
        )}
        <Input
          {...register("arcadePcPrice", { pattern: /\b([1-9]|10)\b/ })}
          label="单局所需币数"
          placeholder="0"
          type="number"
          startContent={<IconCoins />}
          //@ts-ignore
          value={String(arcadePcPrice)}
          variant="bordered"
          //@ts-ignore
          onValueChange={setArcadePcPrice}
        />
        <div className="flex flex-row justify-evenly gap-2">
          <Button
            color={isMarking ? "secondary" : "primary"}
            size="lg"
            variant={isMarking ? "bordered" : "solid"}
            onPress={() => {
              setIsMarking(!isMarking);
            }}
          >
            {isMarking ? "点击地图……" : "地图选点"}
          </Button>
          {(errors?.arcadeLat?.type === "pattern" ||
            errors?.arcadeLng?.type === "pattern" ||
            errors?.arcadeLat?.type === "pattern" ||
            errors?.arcadeLng?.type === "pattern") && (
            <p className="text-red-400 text-xs pl-2 opacity-0">占位</p>
          )}
          <Input
            {...register("arcadeLng", {
              required: true,
              pattern:
                /^[\-\+]?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,10})?|180\.0{1,10})$/,
            })}
            isRequired
            label="经度"
            variant="bordered"
            size="sm"
            //@ts-ignore
            value={arcadeLng}
            type="number"
            //@ts-ignore
            onValueChange={setArcadeLng}
          />
          {errors?.arcadeLng?.type === "required" && (
            <p className="text-red-400 text-xs pl-2">请输入经度</p>
          )}
          {errors?.arcadeLng?.type === "pattern" && (
            <p className="text-red-400 text-xs pl-2">请输入正确的经度</p>
          )}
          <Input
            {...register("arcadeLat", {
              required: true,
              pattern: /^[\-\+]?((0|([1-8]\d?))(\.\d{1,10})?|90(\.0{1,10})?)$/,
            })}
            isRequired
            type="number"
            variant="bordered"
            label="纬度"
            //@ts-ignore
            value={arcadeLat}
            size="sm"
            //@ts-ignore
            onValueChange={setArcadeLat}
          />
          {errors?.arcadeLat?.type === "required" && (
            <p className="text-red-400 text-xs pl-2">请输入纬度</p>
          )}
          {errors?.arcadeLat?.type === "pattern" && (
            <p className="text-red-400 text-xs pl-2">请输入正确的纬度</p>
          )}
        </div>
        <Button
          fullWidth
          color="danger"
          size="lg"
          type="submit"
          variant="shadow"
        >
          提交信息
        </Button>
      </form>
    </div>
  );
}

export default EditArcadeForm;
