import { getAuthByServiceName } from './getAuthByServiceName';

describe('getAuthByServiceName', () => {
  it('should get auth by service name', async () => {
    const result = await getAuthByServiceName('andpad');

    expect(result).toHaveProperty('access_token');
  });
});