import { apiClient, expiresIn, getPrivateKey, integratorKey, oAuthBasePath, scopes, userId } from 'kokoas-server/src/config';
import { IRequestJWTUserTokenResponse } from 'types';
import { fetchUserInfo } from '../authentication';


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

    console.log(jwt);
  });

  it('should users base URI', async () => {
    const userInfo = await fetchUserInfo();


    console.log(userInfo);
  });
});

