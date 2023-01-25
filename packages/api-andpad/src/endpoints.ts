import { baseURL } from './config';

export const endpoints = {
  authCode: `${baseURL}/auth/oauth/authorize`,
  authToken: `${baseURL}/auth/oauth/token`,

  myOrders: `${baseURL}/my/orders`,
};