export const percentageToColor = (percentage, maxHue = 120, minHue = 0) => {
  const hue = percentage * (maxHue - minHue) + minHue;
  return `hsl(${hue}, 100%, 45%)`;
};
