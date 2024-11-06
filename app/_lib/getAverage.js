export default function getAverage(array, property) {
  const sum = array.reduce((acc, item) => acc + item[property], 0);
  return sum / array.length;
}
