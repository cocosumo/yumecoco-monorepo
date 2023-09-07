import { describe, it, expect } from '@jest/globals';
import { getAllPaymentConfRemainder } from './getAllPaymentConfRemainder';


describe('getAllPaymentConfRemainder', () => {
  it('入金確認リマインダーアプリの全レコードを取得します', async () => {
    const result = await getAllPaymentConfRemainder();

    console.log('result::', result[0].alertTarget.value);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].$id).toBeDefined();

  });
});
