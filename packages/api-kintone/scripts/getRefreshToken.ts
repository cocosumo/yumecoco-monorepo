import { getRefreshToken } from '../src/@auth/getRefreshToken';

(async ()=>{

  try {

    const authCode = process.env.KT_AUTH_CODE;

    if (!authCode) throw new Error('KT_AUTH_CODE undefined');

    console.log('authCode', authCode);


    const result = await getRefreshToken({
      code: authCode,
    });

    console.log(result);
    console.log('Save refresh token to .env.KT_REFRESH_TOKEN');

  } catch (e) {
    console.log('失敗しました。', e.message, e.toJSON());
  }




})();
