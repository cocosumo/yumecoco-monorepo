import { describe, it, expect } from '@jest/globals';
import { searchCustGroupByKeyword } from './searchCustGroupByKeyword';

describe('searchCustGroupByKeyword', () => {
  it('should return an array of customer groups that match the keyword', async () => {
    const result = await searchCustGroupByKeyword({ keyword: 'テスト' });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    result.forEach((group) => {
      console.log(JSON.stringify(group.members.value, null, 2));
      expect(JSON.stringify(group.members.value)).toContain('テスト');
    });

    console.log('Result length:', result.length);
  });

  it('should return an empty array if no customer groups match the keyword', async () => {
    const result = await searchCustGroupByKeyword({ keyword: 'nonexistent' });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });
});