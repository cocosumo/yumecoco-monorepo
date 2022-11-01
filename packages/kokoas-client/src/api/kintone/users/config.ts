import { LOGIN_AUTH, BASE_URL } from '../helpers/constants';

export const URL = `${BASE_URL}/v1/users.json`;

export const CONFIG = {
  headers: { 'X-Cybozu-Authorization': LOGIN_AUTH ?? 'Please set login info, both in .env and jest folder.' },
  data: '',
};