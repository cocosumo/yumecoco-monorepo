import axios from 'axios';
import { load } from 'cheerio';
import FormData from 'form-data';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';



export const andpadInstance = async (url: string) => {
  const jar = new CookieJar();
  
  const instance = wrapper(axios.create({
    withCredentials: true,
    jar,
  }));

  const { data } = await instance.get(url);
  const $ = load(data);

  const authToken = $('input[type="hidden"]').attr('value');

  if (!authToken) throw new Error('authToken is not found');

  console.log('Found token', authToken);

  const bodyFormData = new FormData();
  bodyFormData.append('authenticity_token', authToken);

  instance.defaults.headers['x-csrf-token'] = authToken;


  const { data: loginData } = await instance({
    url: 'https://andpad.jp/auth/auth0',
    method: 'POST',
    data: bodyFormData,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
    },
  });



  console.log(loginData);

  return loginData;
};