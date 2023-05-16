import axios, { AxiosError } from 'axios';
import { ZodError } from 'zod';
import { getToken } from '../@auth/andpadClient';

export const getMembers = async () => {

  try {


    const url = 'https://api.andpad.jp/v3/workman/clients/our/orders/10382327/members';
    
    const { data } = await axios({
      url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });

    return data;
  } catch (err) {
    const {
      response,
      errors,
    } = (err || {}) as AxiosError & ZodError;
    const errorMsg = `saveProject が失敗しました. COCOAS_ERROR: ${JSON.stringify(errors)}, ANDPAD_ERROR: ${response?.data ?? ''}`;
    console.error(err);
    throw new Error(`${errorMsg}`);
  }
};