import axios from "axios";
import { BASE_API_URL } from './../constants/config';

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000,
  withCredentials: true,
});

export default axiosInstance;
