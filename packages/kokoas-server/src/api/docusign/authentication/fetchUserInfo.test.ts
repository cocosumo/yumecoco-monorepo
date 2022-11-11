import { fetchUserInfo, getAccountId } from './fetchUserInfo';

describe('User Info', ()=>{
  it('should get base uri', async ()=>{
    const response = await fetchUserInfo();
    console.log('base uri', response?.accounts[0].baseUri);
    expect(response?.accounts[0].baseUri.includes('http')).toEqual(true);
  });

  it('should get accountId', async () => {
    const userId = await getAccountId();
    console.log('userId', userId);
    expect(userId).toBeDefined();
  });
});
