export function getAverage<T>(array: T[], property: keyof T): number {
  const sum = array.reduce(
    (acc, item) => acc + (item[property] as unknown as number),
    0,
  );

  return sum / array.length;
}

export function getMostFrequent<T>(
  array: T[],
  property: keyof T,
): T[keyof T] | null {
  const countMap: Record<string, number> = {};

  array.forEach((item) => {
    const value = item[property] as unknown as string;

    if (countMap[value]) {
      countMap[value]++;
    } else {
      countMap[value] = 1;
    }
  });

  let maxCount = 0;
  let mostFrequentValue: T[keyof T] | null = null;

  for (const value in countMap) {
    if (countMap[value] > maxCount) {
      maxCount = countMap[value];
      mostFrequentValue = value as unknown as T[keyof T];
    }
  }

  return mostFrequentValue;
}

export function formatReadableDate(isoString: string): string {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return date.toLocaleDateString("zh-CN", options);
}
