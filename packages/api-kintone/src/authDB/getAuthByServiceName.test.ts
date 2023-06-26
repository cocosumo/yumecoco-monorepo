import { getAuthByServiceName } from './getAuthByServiceName';
import { describe, it, expect } from '@jest/globals';

describe('getAuthByServiceName', () => {
  it('should get auth by service name', async () => {
    const result = await getAuthByServiceName('andpad');

    expect(result).toHaveProperty('access_token');
  });
});