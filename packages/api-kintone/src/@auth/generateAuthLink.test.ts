import { generateAuthLink } from './generateAuthLink';

it('should generate authentication link', () =>{
  const result  = generateAuthLink({
    baseURL: process.env.KT_BASE_URL,
    clientId: process.env.KT_CLIENT_ID,
    redirectURI: process.env.KT_REDIRECT_URI,
  });

  console.log(result);

  expect(result.includes('cybozu')).toBe(true);
});