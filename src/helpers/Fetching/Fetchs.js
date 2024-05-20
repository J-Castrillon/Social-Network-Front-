import { getToLocalStorage } from "../storage/Session";

const apiUrl = import.meta.env.VITE_REACT_APP_URL;

export const postFetching = async (complement, body) => {
  try {
    return await fetch(`${apiUrl}${complement}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToLocalStorage("Session")?.token,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response) throw new Error("Request Error");

        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(request);
  } catch (error) {
    console.log(error);
  }
};

export const postUploadFetching = async (complement, body) => {
  try {
    return await fetch(`${apiUrl}${complement}`, {
      method: "POST",
      headers: {
        Authorization: getToLocalStorage("Session")?.token,
      },
      body,
    })
      .then((response) => {
        if (!response) throw new Error("Request Error");

        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(request);
  } catch (error) {
    console.log(error);
  }
};

export const getFetching = async (url, Authorization) => {
  try {
    return await fetch(`${apiUrl}${url}`, {
      method: "GET",
      headers: {
        Authorization: getToLocalStorage("Session")?.token,
      },
    })
      .then((response) => {
        if (!response) throw new Error("Request Error");

        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

export const putFetching = async (url, body) => {
  try {
    return await fetch(`${apiUrl}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToLocalStorage("Session")?.token,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response) throw new Error("Request Error");

        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

export const deleteFetching = async (complement) => {
  try {
    return await fetch(`${apiUrl}${complement}`, {
      method: "DELETE",
      headers: {
        Authorization: getToLocalStorage("Session")?.token,
      },
    })
      .then((response) => {
        if (!response) throw new Error("Request Error");

        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
