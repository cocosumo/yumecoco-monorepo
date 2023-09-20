import { describe, it/* , expect */ } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { createPaymentAlert } from './createPaymentAlert';


describe('createPaymentAlert', () => {
  it('should return alert date', async () => {


    const result = await createPaymentAlert();

    const dir = path.join(__dirname, '__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // save json file
    fs.writeFileSync(
      path.join(dir, `createPaymentAlert_${format(new Date(), 'yyyyMMddHHmmss')}.json`),
      JSON.stringify(result, null, 2),
    );

    // 配列であることを確認
    //expect(Array.isArray(result)).toBe(true);

    // 配列の長さが1以上であることを確認
    //expect(result.length).toBeGreaterThan(0);

  }, 10000);
});
