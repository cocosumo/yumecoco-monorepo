import { fetchToken, refreshToken } from './getToken';

describe('getToken', () => {
  it('should fetchToken', async () => {

    const result = await fetchToken();
    console.log(result);

    expect(result).toBeDefined();
  });

  it('shoud refresh token', async () => {
    const result = await refreshToken();
    console.log(result);


    expect(result).toBeDefined();
  });

});
