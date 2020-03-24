const adjustPadding = (labelsArray) => {
  const longestLabel = (labelsArray.reduce((acc, curr) => (acc.length > curr.length ? acc : curr))).length;
  const calculatedPadding = 100 / 12 * longestLabel;
  let padding;
  if (calculatedPadding < 70) {
    padding = 70;
  } else if (calculatedPadding > 160) {
    padding = 160
  } else {
    padding = calculatedPadding;
  }
  return padding
}

export default adjustPadding;