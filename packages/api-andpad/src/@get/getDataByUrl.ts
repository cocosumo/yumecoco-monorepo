import axios from 'axios';
import { endpoints } from '../endpoints';

export const getDataByUrl = async <T>(andpadEndpoint: string) : Promise<T> => {

  const url = endpoints.getDataByUrl;

  const headers = {
    'x-api-key': process.env.AWS_API_KEY,
  };

  console.log('headers', headers);
    
  const { data } = await axios({
    url,
    method: 'POST',
    headers,
    data: {
      url: andpadEndpoint,
    },
  });

  return data;
};