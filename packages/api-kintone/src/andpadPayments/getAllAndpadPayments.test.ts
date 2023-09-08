import { describe, it, expect } from '@jest/globals';
import { getAllAndpadPayments } from './getAllAndpadPayments';


describe('getAllAndpadPayments', () => {
  it('入金確認リマインダーアプリの全レコードを取得します', async () => {
    const result = await getAllAndpadPayments();

    console.log('result::', result[0]);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].$id).toBeDefined();

  });
});
