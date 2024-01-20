import { describe, expect } from '@jest/globals';
import { getAndpadCookies } from './getAndpadCookie';

describe('getAndpadCookies', () => {
  it('should return andpad cookies', async () => {
    const result = await getAndpadCookies();
    expect(result.includes('session=')).toBeTruthy();

    
  });
});