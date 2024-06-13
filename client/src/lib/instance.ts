import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useInstance() {
  const navigate = useNavigate()
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_APIURL,
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("_auth");
      if (accessToken) {
        if (config.headers)
          config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      switch (error.response.status) {
        case 401:
          toast.error(error.response.data.detail)
          navigate('/login')
          break;

        case 422:
          break;

        case 409:
          toast.error(error.response.data.message)
          break;

        case 500:
          break;

        default:
          break;
      }
      return Promise.reject(error);
    },
  );

  return {
    instance
  }
}

