import { describe, expect, it } from '@jest/globals';
import { getAndpadCookieSession } from './getAndpadCookieSession';

describe('getAndpadCookiesSession', () => {
  it('should return andpad cookies', async () => {
    const result = await getAndpadCookieSession();
    expect(result.includes('session=')).toBeTruthy();
    
  }, 100000);
});