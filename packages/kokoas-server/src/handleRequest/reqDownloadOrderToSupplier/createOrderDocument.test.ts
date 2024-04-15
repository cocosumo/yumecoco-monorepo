import { describe, expect, it } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { OrderData } from 'types/src/common/order';
import { getOrderData } from './getOrderData';
import { createOrderDocument } from './createOrderDocument';



describe('createOrderDocument', () => {
  const testOrderId = '';
  const testPath = path.join(__dirname, '__TEST__');
  const orderDataPath = path.join(testPath, 'orderTestData.json');
  let orderData: OrderData = Object.create(null);

  beforeAll(async () => {
    console.log('orderDataPath', orderDataPath);

    if (!fs.existsSync(testPath)) {
      fs.mkdirSync(testPath);
    }

    if (fs.existsSync(orderDataPath)) {
      orderData = JSON.parse(fs.readFileSync(orderDataPath, 'utf-8'));
    } else {
      // テストの際、取得時間がかかるので、一度取得したデータは保存しておく
      // 最新が必要な場合は、orderDataPathを削除する
      orderData = await getOrderData(testOrderId);
      fs.writeFileSync(orderDataPath, JSON.stringify(orderData));
    }

  });
  it('should create order document and save to pdf', async () => {

    const pdf = await createOrderDocument(orderData, 'Uint8Array');
    const savePath = path.join(testPath, 'order.pdf');

    // console.log('pdf', pdf);

    fs.writeFileSync(savePath, pdf);
    expect(fs.existsSync(savePath)).toBe(true);

  });

});