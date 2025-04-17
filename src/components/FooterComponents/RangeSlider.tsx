import { useMap } from '@/stores/useMap.tsx';
import { Slider } from '@heroui/slider';

function RangeSlider() {
  const { range, update_range } = useMap();

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
        value={Number(range) / 1000}
        onChange={(e) => {
          if (Array.isArray(e)) {
            update_range(e[0] * 1000);
          } else {
            update_range(e * 1000);
          }
        }}
      />
    </div>
  );
}

export default RangeSlider;
