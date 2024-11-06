export default function getMostFrequent(array, property) {
  const countMap = [];
  array.forEach((item) => {
    const value = item[property];
    console.log(value);
    if (countMap[value]) {
      countMap[value]++;
    } else {
      countMap[value] = 1;
    }
  });

  let maxCount = 0;
  let mostFrequentValue = null;
  for (const value in countMap) {
    if (countMap[value] > maxCount) {
      maxCount = countMap[value];
      mostFrequentValue = value;
    }
  }
  return mostFrequentValue;
}
