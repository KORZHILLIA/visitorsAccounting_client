const sortByParameter = (arr, parameter) => {
  return arr.sort((a, b) => a[parameter].localeCompare(b[parameter]));
};

export default sortByParameter;
