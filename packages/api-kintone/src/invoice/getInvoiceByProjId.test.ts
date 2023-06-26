import { getInvoiceByProjId } from './getInvoiceByProjId';
import { describe, it, expect } from '@jest/globals';

describe('invoice', () => {
  it('should get invoice by project id', async () => {

    const { records, totalCount } = await getInvoiceByProjId('8aa54bb3-10e7-45fa-adde-df7776082c77');

    console.log('請求内容', totalCount, '件', records);

    expect(records).toEqual(
      expect.arrayContaining(
        [
          expect.objectContaining({
            $id: {
              type: expect.any(String),
              value: expect.any(String),
            },
          }),
        ],
      ),
    );
  }, 10000);
});