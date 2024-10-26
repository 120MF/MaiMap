import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Slider } from "@nextui-org/react";

function RangeSlider() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const range = searchParams.get("range") || 40;

  return (
    <Suspense>
      <Slider
        size="md"
        step={10}
        color="foreground"
        label="搜索范围"
        showSteps={true}
        formatOptions={{
          style: "unit",
          unit: "kilometer",
          unitDisplay: "short",
        }}
        maxValue={100}
        minValue={10}
        value={range}
        className="w-56"
        onChange={(e) => {
          const params = new URLSearchParams(searchParams);
          params.set("range", e);
          replace(`${pathname}?${params.toString()}`);
        }}
      />
    </Suspense>
  );
}

export default RangeSlider;
