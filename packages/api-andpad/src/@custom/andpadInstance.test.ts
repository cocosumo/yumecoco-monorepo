import { describe, it } from '@jest/globals';
import { andpadInstance } from './andpadInstance';
import { load } from 'cheerio';

describe('andpadInstance', () => {
  it('should return html', async () => {
    const result = await andpadInstance('https://andpad.jp/manager/my/orders/10892561/contract_orders');

    
  });
});