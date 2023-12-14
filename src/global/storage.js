export const existsData = (key) => {
  return localStorage.getItem(key) !== null;
}

export const getData = (key) => {
  if (existsData(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
  return null;
}

export const setData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const removeData = (key) => {
  localStorage.removeItem(key);
}