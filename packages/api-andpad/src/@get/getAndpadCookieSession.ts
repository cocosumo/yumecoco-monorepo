import axios from 'axios';
import { endpoints } from '../endpoints';

/**
 * Generate a new Andpad session
 * 
 */
export const getAndpadCookieSession = async () => {
  const result = await axios({
    url: `${endpoints.yumecocolabsAPI}/andpad-api/session`,
    method: 'GET',
    headers: {
      'x-api-key': process.env.AWS_API_KEY,
    },
  });

  const str = result.data?.body;
  if (!str) {
    throw new Error('getAndpadCookieSession No body');
  }

  const cookies = JSON.parse(str);

  const cookiesValue: string = cookies
    .find(({ name }: { name: string, value: string }) => name === '_andpad_jp_production_session')
    .value;

  const cookiesString = `_andpad_jp_production_session=${cookiesValue}`;
  return cookiesString;
};