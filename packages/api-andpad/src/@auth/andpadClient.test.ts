import { fetchToken, getToken, refreshToken } from './andpadClient';

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

  it('should retrieve token', async () => {
    const result = await getToken();
    console.log(result);

    expect(typeof result).toBe('string');
  });
});
