import axios, { AxiosError } from 'axios';
import qs from 'qs';
import { ZodError } from 'zod';
import { getToken } from '../@auth/andpadClient';
import { endpoints } from '../endpoints';
import { GetMyOrders, GetMyOrdersResponse } from '../types';

export const getMyOrders = async (params?: GetMyOrders): Promise<GetMyOrdersResponse> => {
  const {
    limit,
    q,
    series = [],
    offset = 0,
  } = params || {};
  try {



    const urlParams = qs.stringify({
      limit,
      q,
      series: series.join(','),
      offset,
    });

    console.log('urlParams', urlParams);

    const url = `${endpoints.ourOrders}?${urlParams}`;
    
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