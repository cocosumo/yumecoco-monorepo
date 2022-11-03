
import axios from 'axios';
import qs from 'qs';

export const getNewAccessToken = async () => {

  const {
    KT_BASE_URL,
    KT_CLIENT_ID,
    KT_CLIENT_SECRET,
    KT_REFRESH_TOKEN,
  } = process.env;
  
  const clientAuth = Buffer.from(`${KT_CLIENT_ID}:${KT_CLIENT_SECRET}`).toString('base64');
  if (!KT_REFRESH_TOKEN) throw new Error('No refresh token. See readme.md to generate.');

  const data = { 
    'grant_type': 'refresh_token', 
    'refresh_token': KT_REFRESH_TOKEN,
  };
  
  try {
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
  } catch (e) {
    console.error(e.message);
    console.log(e.toJSON());

  }
};