export const transformDate = (str) => {
  const arr = str.split("T");
  return [arr[0], arr[1].slice(0, 8)].join(" ");
};
