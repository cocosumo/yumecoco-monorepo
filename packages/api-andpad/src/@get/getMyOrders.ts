import axios, { AxiosError } from 'axios';
import qs from 'qs';
import { ZodError } from 'zod';
import { getToken } from '../@auth/andpadClient';
import { endpoints } from '../endpoints';
import { SaveProjectResponse } from '../types';

interface GetMyOrders {
  limit?: number,
  offset?: number,
  q?: string,
}

interface GetMyOrdersResponse {
  data: {
    total: number,
    last_flg: boolean,
    limit: number,
    offset: number,
    objects: Array<SaveProjectResponse>
  }
}

export const getMyOrders = async (params?: GetMyOrders): Promise<GetMyOrdersResponse> => {
  const {
    limit,
    q,
  } = params || {};
  try {

    const urlParams = qs.stringify({
      access_token: await getToken(),
      limit,
      q,
    });

    console.log(urlParams);

    const { data } = await axios({
      url: `${endpoints.myOrders}?${urlParams}`,
      method: 'GET',
    });

    return data;
  } catch (err) {
    const {
      response,
      errors,
    } = err as AxiosError & ZodError;
    const errorMsg = `saveProject が失敗しました. COCOAS_ERROR: ${JSON.stringify(errors)}, ANDPAD_ERROR: ${response?.data?.errors ?? ''}`;
    console.error(err);
    throw new Error(`${errorMsg}`);
  }
};