// baseURL: import.meta.env.VITE_URL_API,

import axios from "axios";

import { Modal } from "antd";
import { useStorageStore } from "../pages/shared/storage.store";
const { token, refresh_token, handleRefreshToken, handleLogout } =
  useStorageStore.getState();

//add base url for main API
const request = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
});

//add base url for auth API
const authRequest = axios.create({
  baseURL: import.meta.env.VITE_URL_API_AUTH,
});

//ADD TOKEN to both request instances
if (token) {
  request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  authRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

//IF TOKEN EXPIRED / 401
request.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error?.response?.status);

    if (error?.response?.status === 401) {
      const isExpired = error?.response?.status === 401;
      const originalRequest = error.config;

      if (isExpired && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await authRequest.post(`/auth/token/refresh/`, {
            refresh: refresh_token,
          });
          //set token
          console.log(response, "response from refresh token");

          await handleRefreshToken({
            token: response.data.access,
            refresh_token: response.data.refresh,
          });
          //set header with new token
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          //return to original request
          return axios(originalRequest);
        } catch (error: any) {
          console.log("error refresh token");
          Modal.error({
            title: "Error",
            maskClosable: false,
            onOk: () => {
              handleLogout();
            },
            okText: "Log In",
            content: `${
              error?.response !== undefined
                ? Object?.values(error?.response?.data)
                : "Error request"
            }`,
            okType: "danger",
          });
        }
      } else {
        Modal.error({
          title: "Error",
          maskClosable: false,
          onOk: () => {
            handleLogout();
          },
          content: `${
            error?.response !== undefined
              ? Object?.values(error?.response?.data)
              : "Error request"
          }`,
          okType: "danger",
        });
      }
    }
    return Promise.reject(error);
  }
);

export const fetcherPOST = async (url: string, data: any) => {
  try {
    const response = await request.post(url, data);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetcherDelete = async (url: string, data: any) => {
  try {
    const response = await request.delete(url, data);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetcherGET = async (url: string, params: any) => {
  console.log(params);
  try {
    const response = await request.get(url, {
      params: params || null,
    });
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetcherPUT = async (url: string, data: any) => {
  try {
    const response = await request.put(url, data);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetcherPATCH = async (url: string, data: any) => {
  try {
    const response = await request.patch(url, data);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Auth API fetchers
export const authFetcherPOST = async (url: string, data: any) => {
  try {
    const response = await authRequest.post(url, data);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const authFetcherGET = async (url: string, params: any) => {
  try {
    const response = await authRequest.get(url, {
      params: params || null,
    });
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
