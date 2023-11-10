import { expect, describe, it } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { getAllAndpadOrders } from './getAllAndpadOrders';

describe('getAllAndpadOrders', () => {

  it('should get all orders', async () => {
    const result = await getAllAndpadOrders({
      beforeInvoiceIssue: false,
    });

    console.log('count', result.data.total);
    expect(result.data.total).toEqual(result.data.objects.length);

  }, 1000000);

  it('should get all orders after contract', async () => {
    const result = await getAllAndpadOrders({
      beforeInvoiceIssue: true,
    });


    const dir = path.join(__dirname, '__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // save json file
    fs.writeFileSync(
      path.join(dir, `getAllOrders_${format(new Date(), 'yyyyMMddHHmmss')}.json`),
      JSON.stringify(result, null, 2),
    );

    console.log('count', result.data.total);
    expect(result.data.total).toBeDefined();
  }, 1000000);

});
