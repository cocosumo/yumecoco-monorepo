import axios from 'axios';
import qs from 'qs';
import { andpadToken } from '../@auth/getToken';
import { endpoints } from '../endpoints';

export const getMyOrders = async () => {
  try {

    const params = qs.stringify({
      access_token: andpadToken.access_token,
    });

    const { data } = await axios({
      url: `${endpoints.myOrders}?${params}`,
      method: 'GET',
    });

    return data;
  } catch (err) {
    console.error(err);
    throw new Error(`getMyOrders が失敗しました. ${err.message}`);
  }
};