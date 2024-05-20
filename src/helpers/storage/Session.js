export const saveToLocalStorage = (body) => {
  localStorage.setItem("Session", JSON.stringify(body));
  return body;
};

export const getToLocalStorage = (key) => {
  const request = JSON.parse(localStorage.getItem(key));

  if (!request) {
    return "Error";
  }

  return request;
};

export const deleteToLocalStorage = (key) => {
  const request = localStorage.removeItem(key);
  return request;
};
