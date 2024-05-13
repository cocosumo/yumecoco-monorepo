import { describe, expect, it } from '@jest/globals';
import { GetDownloadOrderSlipResult } from 'types/src/common/order';
import { getOrderData } from './getOrderData';
import { createOrderDocument } from './createOrderDocument/createOrderDocument';
import { emailOrderToSupplier } from './emailOrderToSupplier';

describe('emailOrderToSupplier', () => {
  it('should send order with attachment', async () => {
    const orderId = '0feb1da1-30fd-4ac9-99be-0dbf316de916';
    const dataResult = await getOrderData(orderId);
    const fileB64 = await createOrderDocument(dataResult, 'base64');

    const response: GetDownloadOrderSlipResult = {
      data: dataResult,
      fileName: `発注書-${dataResult.orderId}.pdf`,
      fileB64: fileB64 as string,
    };

    
    const result = await emailOrderToSupplier(response);

    console.log(result);

    expect(result).toBeTruthy();
  });
});
