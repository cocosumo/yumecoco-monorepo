import { fetchAccessToken, getJwtGrantToken } from './fetchAccessToken';
import { describe, it, expect } from '@jest/globals';

describe('Authentication', () => {
  it('should give token', async () => {
    const token = await fetchAccessToken();
    console.log('token', token);
    expect(token).toBeDefined();
  });

  it('should get token if expired', async ()=>{
    const token = await getJwtGrantToken();
    console.log('token', token);
    expect(token).toBeDefined();
  });
});
