import axios, {AxiosInstance} from 'axios';

const BACK_URL = 'https://camera-shop.accelerator.pages.academy';
const REQUST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACK_URL,
    timeout: REQUST_TIMEOUT
  });

  return api;
};

