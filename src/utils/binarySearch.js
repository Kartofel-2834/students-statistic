export default function binarySearch(value, array, compare = (a, b) => a - b) {
  let start = 0;
  let end = array.length;
  let pointer = Math.floor((end - start) / 2);

  let index, compareResult;

  while (pointer >= 1 || start > end) {
    index = start + pointer;
    compareResult = compare(array[index], value);

    if (compareResult < 0) {
      start = index;
    } else if (compareResult > 0) {
      end = index;
    } else {
      return index;
    }

    pointer = Math.floor((end - start) / 2);
  }

  if (array[start] && compare(array[start], value) === 0) {
    return start;
  } else if (array[end] && compare(array[end], value) === 0) {
    return end;
  }

  return null;
}
