import axios from "axios";
import { API_URL } from "./config";
axios.defaults.withCredentials = true;

export const postApi = async (url: string, post: object, token?: string) => {
  const res = await axios.post(`${API_URL}/api/${url}`, post, {
    headers: { Authorization: token ? token : "" },
  });

  return res;
};

export const getApi = async (url: string, token?: string) => {
  const res = await axios.get(`${API_URL}/api/${url}`, {
    headers: { Authorization: token ? token : "" },
  });

  return res;
};

export const putApi = async (url: string, post: object, token?: string) => {
  const res = await axios.put(`${API_URL}/api/${url}`, post, {
    headers: { Authorization: token ? token : "" },
  });

  return res;
};

export const patchApi = async (url: string, post: object, token?: string) => {
  const res = await axios.patch(`${API_URL}/api/${url}`, post, {
    headers: { Authorization: token ? token : "" },
  });

  return res;
};

export const deleteApi = async (url: string, token?: string) => {
  const res = await axios.delete(`${API_URL}/api/${url}`, {
    headers: { Authorization: token ? token : "" },
  });

  return res;
};

export const deleteApiUpload = async (
  url: string,
  post?: object,
  token?: string
) => {
  const res = await axios.post(`${API_URL}/api/${url}`, post, {
    headers: { Authorization: token ? token : "" },
  });

  return res;
};

export const deleteApiValid = async (url: string, token?: string) => {
  const res = await axios.delete(`${API_URL}/api/${url}`, {
    headers: { Authorization: token ? token : "" },
  });

  return res;
};
