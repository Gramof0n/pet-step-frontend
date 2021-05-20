import axios from "axios";

export const config = {
  BASE_URL: "http://192.168.1.8:3000/api/v1/",
};

export const get = async (path: string) => {
  try {
    const request = {
      url: `${config.BASE_URL}${path}`,
      method: "GET",
    };

    const res = await axios.get(request.url);
    return res;
  } catch (err) {
    console.log("greska");
    console.log(err);
  }
};

export const post = async (path: string, body: object) => {
  try {
    const request = {
      url: `${config.BASE_URL}${path}`,
      method: "POST",
    };

    const res = await axios.post(request.url, body);

    console.log("res " + res);
    return res;
  } catch (err) {
    console.log("greska");
    console.error(err);
  }
};

export const remove = async (path: string) => {
  try {
    const request = {
      url: `${config.BASE_URL}${path}`,
      method: "DELETE",
    };

    const res = await axios.delete(request.url);
    return res;
  } catch (err) {
    console.log("greska");
    console.log(err);
  }
};

export const update = async (path: string, body: object) => {
  try {
    const request = {
      url: `${config.BASE_URL}${path}`,
      method: "PUT",
    };

    const res = await axios.put(request.url, body);
    return res;
  } catch (err) {
    console.log("greska");
    console.log(err);
  }
};
