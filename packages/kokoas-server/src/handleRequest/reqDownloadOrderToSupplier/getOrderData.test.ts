import { describe, expect, it } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { getOrderData } from './getOrderData';



describe('getOrderData', () => {
  const testOrderId = '3a7397da-9567-4eef-b851-9937eb227ff9';

  it('should create order document and save to pdf', async () => {

    const testPath = path.join(__dirname, '__TEST__');
    const savePath = path.join(testPath, 'getOrderData.json');
    const result = await getOrderData(testOrderId);

    if (!fs.existsSync(testPath)) {
      fs.mkdirSync(testPath);
    }

    fs.writeFileSync(savePath, JSON.stringify(result, null, 2));

    expect(fs.existsSync(savePath)).toBe(true);
    expect(result.orderId).toBe(testOrderId);

  });

});
