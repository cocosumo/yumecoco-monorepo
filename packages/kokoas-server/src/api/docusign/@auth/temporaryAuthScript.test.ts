import { apiClient, expiresIn, getPrivateKey, integratorKey, oAuthBasePath, scopes, userId } from 'kokoas-server/src/config';
import { IRequestJWTUserTokenResponse } from 'types';
import { fetchUserInfo } from '../authentication';


/*
  WIP
  仮ファイル
  将来的、api-docusignというパッケージに移行します。
*/

describe('Temporary auth script', () => {

  it('should get authorization uri', () => {

    const uri = apiClient.getJWTUri(
      integratorKey,
      'http://localhost:8080/ds/callback',
      oAuthBasePath,
    );

    console.log(uri);
  });


  it('should create JWT', async () => {

    const privateKey = await getPrivateKey();

    const jwt: IRequestJWTUserTokenResponse = await apiClient
      .requestJWTUserToken(
        integratorKey,
        userId,
        scopes,
        privateKey,
        expiresIn,
      );
      //.catch((e) => console.log(e));

    console.log(jwt.body.access_token);
  });

  it('should users base URI', async () => {
    const userInfo = await fetchUserInfo();


    console.log(userInfo);
  });
});

