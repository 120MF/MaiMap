import { useMap } from '@/stores/useMap.tsx';
import { Slider } from '@heroui/slider';

function RangeSlider() {
  const range = useMap((state) => state.range);
  const update_range = useMap((state) => state.update_range);

  return (
    <div className="w-36 sm:w-48 md:w-52 lg:w-64">
      <Slider
        className="w-full"
        color="foreground"
        formatOptions={{
          style: 'unit',
          unit: 'kilometer',
          unitDisplay: 'short',
        }}
        label="搜索范围"
        maxValue={100}
        minValue={10}
        showSteps={true}
        size="md"
        step={10}
        value={Number(range)}
        onChange={(e) => {
          if (Array.isArray(e)) {
            update_range(e[0]);
          } else {
            update_range(e);
          }
        }}
      />
    </div>
  );
}

export default RangeSlider;
