const adjustPadding = (labelsArray) => {
  const longestLabel = (labelsArray.reduce((acc, curr) => (acc.length > curr.length ? acc : curr))).length;
  const padding = (100 / 12 * longestLabel);
  return padding
}

export default adjustPadding;