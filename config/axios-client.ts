import axios from 'axios';

import { useAuthStore } from '@/stores';
import { getItem, ROUTES } from '@/utils';
import { CONFIG } from '@/config/config';

const instance = axios.create({
  baseURL: `${CONFIG.NEXT_PUBLIC_API_BASE_URL}/v1`,
});

const CANCELLED_STATUS_CODE = 499;
function errorHandler(error: any) {
  let { status } = error.response || {};
  status = error.code === 'ERR_CANCELED' ? CANCELLED_STATUS_CODE : status;

  const { reset } = useAuthStore();

  if (status === 401) {
    if (
      window.location.pathname.includes('user/host') &&
      !window.location.pathname.includes('auth')
    ) {
      reset();
      window.location.pathname = ROUTES.USER.HOST.AUTH.LOGIN;
    }
    if (
      window.location.pathname.includes('user/client') &&
      !window.location.pathname.includes('auth')
    ) {
      reset();
      window.location.pathname = ROUTES.USER.CLIENT.AUTH.LOGIN;
    }
  }

  // eslint-disable-next-line no-throw-literal
  throw {
    status,
    ...(error?.response?.data || {
      message: error.message || 'Sorry, an unexpected error occurred.',
    }),
  };
}

instance.interceptors.request.use((request: any) => {
  const headers = request.headers;
  const accessToken = useAuthStore.getState()?.accessToken;
  return {
    ...request,
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

instance.interceptors.response.use(
  (response) => {
    const setToken = useAuthStore.getState().setToken;
    const { data } = response;
    if (data?.accessToken) setToken(data.accessToken);
    return data;
  },
  (error) => errorHandler(error),
);

export { instance as httpClient };
