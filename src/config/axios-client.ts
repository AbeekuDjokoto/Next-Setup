import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { useAuthStore } from '@/stores';
// import { ENV_VARS } from '@/utils/constants';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5200',
});

const CANCELLED_STATUS_CODE = 499;
function errorHandler(error: AxiosError) {
  let { status } = error.response || {};
  status = error.code === 'ERR_CANCELED' ? CANCELLED_STATUS_CODE : status;

  if (status === 401 && !window.location.pathname.includes('auth')) {
    window.location.pathname = '/auth/login';
  }

  throw {
    status,
    ...(error?.response?.data || {
      message: error.message || 'Sorry, an unexpected error occurred.',
    }),
  };
}

instance.interceptors.request.use((request: InternalAxiosRequestConfig<any>) => {
  const token = useAuthStore.getState()?.token;

  if (token) request.headers['Authorization'] = `Bearer ${token}`;

  return request;
});

instance.interceptors.response.use(
  (response) => {
    const setToken = useAuthStore.getState().setToken;
    const { data } = response;
    if (data?.token) setToken(data.token);
    return data;
  },
  (error) => errorHandler(error),
);

export { instance as axiosClient };
