import axios, { AxiosError } from 'axios';
import { ZodError } from 'zod';
import { getToken } from '../@auth/andpadClient';
import { endpoints } from '../endpoints';

export const getMembers = async ({
  systemId,
}:{
  systemId: string
}) => {

  try {


    const url = endpoints.getMembers(systemId);
    
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