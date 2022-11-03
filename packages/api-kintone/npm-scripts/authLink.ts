import { loadEnv } from 'config';
import { generateAuthLink } from './../src/auth/generateAuthLink';

(()=>{
  loadEnv();

  console.log(__dirname);
  const baseURL = process.env.KT_BASE_URL;
  const clientId = process.env.KT_CLIENT_ID;

  if (!baseURL) throw new Error('baseUrl undefined');
  if (!clientId) throw new Error('clientId undefined');

  const authLink = generateAuthLink({
    baseURL,
    clientId: clientId,
    redirectURI: 'https://rdmuhwtt6gx7.cybozu.com/k/176/',
  });

  console.log('Click the following link, allow, then take note of the code.');
  console.log(authLink);
})();
