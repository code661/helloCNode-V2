import axios from "axios";
import { LoadingBar } from "iview";
import Config from "../config";

const instance = axios.create({
  baseURL: Config.baseUrl,
  timeout: 8000
});

instance.interceptors.request.use(
  config => {
    LoadingBar.start();
    return config;
  },
  error => {
    LoadingBar.error();
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      LoadingBar.finish();
      return response.data;
    }
    LoadingBar.error();
    return Promise.reject(response);
  },
  error => {
    LoadingBar.error();
    return Promise.reject(error);
  }
);
export default instance;
