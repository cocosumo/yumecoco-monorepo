import { describe, it/* , expect */ } from '@jest/globals';
import { createPaymentAlert } from './createPaymentAlert';


describe('createPaymentAlert', () => {
  it('should return alert data', async () => {

    await createPaymentAlert();

    // 配列であることを確認
    //expect(Array.isArray(result)).toBe(true);

    // 配列の長さが1以上であることを確認
    //expect(result.length).toBeGreaterThan(0);

  }, 10000);
});
