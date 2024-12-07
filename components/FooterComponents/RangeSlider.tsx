"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Slider } from "@nextui-org/slider";

function RangeSlider() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const range = searchParams.get("range") || 40;

  return (
    <div className="w-36 sm:w-48 md:w-52 lg:w-64">
      <Slider
        className="w-full"
        color="foreground"
        formatOptions={{
          style: "unit",
          unit: "kilometer",
          unitDisplay: "short",
        }}
        label="搜索范围"
        maxValue={100}
        minValue={10}
        showSteps={true}
        size="md"
        step={10}
        value={Number(range)}
        onChange={(e) => {
          const params = new URLSearchParams(searchParams);

          params.set("range", String(e));
          replace(`${pathname}?${params.toString()}`);
        }}
      />
    </div>
  );
}

export default RangeSlider;
