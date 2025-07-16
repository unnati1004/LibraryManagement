// src/api/axios.js
import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/',
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = Cookies.get("token") || localStorage.getItem("token");
if (token) {
  config.headers.Authorization = `Bearer ${token}`;
}
  return config;
});

export default instance;
