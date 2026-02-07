export const capitalize = (text = "") => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatPercentage = (value) => {
  return `${value}%`;
};
