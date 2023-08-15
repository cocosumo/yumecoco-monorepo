import axios from 'axios';
import { endpoints } from '../endpoints';
import { getToken } from '../@auth/andpadClient';

export const getDataByUrl = async <T>(andpadEndpoint: string) : Promise<T> => {

  const url = endpoints.getDataByUrl;
    
  const { data } = await axios({
    url,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      'x-api-key': process.env.AWS_API_KEY,
    },
    data: {
      url: andpadEndpoint,
    },
  });

  return data;
};