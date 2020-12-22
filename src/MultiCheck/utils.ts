export type Sequence = {
  start: number;
  end: number;
};

/**
 * Get options sequences by columns
 * @param length length of options
 * @param columns
 * @returns Array<Sequence>
 */
const getSequences = (length: number, columns: number = 1): Sequence[] => {
  // position of 'Select all'
  const offsetBefore: number = 1;
  // rows of each column
  const rows: number = Math.ceil((length + offsetBefore) / columns);
  const tempSequences: Sequence[] = [];
  for (let i: number = 0; i < columns; i++) {
    let start: number = rows * i;
    let end: number = rows * (i + 1);
    // over length
    if (end > length) {
      end = length;
    }
    // not first
    if (i > 0) {
      start -= offsetBefore;
    }
    // not last
    if (i < columns - 1) {
      end -= offsetBefore;
    }
    tempSequences.push({ start, end });
  }
  return tempSequences;
};

export default {
  getSequences,
};
