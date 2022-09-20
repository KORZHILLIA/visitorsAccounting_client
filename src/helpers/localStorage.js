const KEY = "currentUser";

export const lSSave = (data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(KEY, serializedData);
  } catch (error) {
    throw error.message;
  }
};

export const lSLoad = (key = KEY) => {
  try {
    const data = localStorage.getItem(key);
    return data === null ? undefined : JSON.parse(data);
  } catch (error) {
    throw error.message;
  }
};

export const lSRemoveItem = (key = KEY) => {
  localStorage.removeItem(key);
};
