import axios from 'axios';
import qs from 'qs';

export const getRefreshToken = async ({
  code,
}:{
  code: string
}) => {
  const {
    KT_BASE_URL,
    KT_CLIENT_ID,
    KT_CLIENT_SECRET,
    KT_REDIRECT_URI,
  } = process.env;

  const clientAuth = Buffer.from(`${KT_CLIENT_ID}:${KT_CLIENT_SECRET}`).toString('base64');

  const data = {
    'grant_type': 'authorization_code',
    'redirect_uri': KT_REDIRECT_URI,
    'code': code,
  };


  const result = await axios({
    method: 'POST',
    url: `${KT_BASE_URL}oauth2/token`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${clientAuth}`,

    },
    data: qs.stringify(data),
  });


  return result.data;

};