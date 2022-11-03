import { getRefreshToken } from '../src/auth/getRefreshToken.js';

(async ()=>{


  const authCode = process.env.KT_AUTH_CODE;

  if (!authCode) throw new Error('KT_AUTH_CODE undefined');

  console.log('authCode', authCode);


  const result = await getRefreshToken({
    code: authCode,
  });

  console.log(result);
  console.log('Save refresh token to .env.KT_REFRESH_TOKEN');

})();
