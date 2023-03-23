import { getInvoiceByEstDataId } from './getInvoiceByEstDataId';

describe('getInvoiceByEstDataId', () => {
  it('should get invoice by estDataId', async () => {

    const { records, totalCount } = await getInvoiceByEstDataId('KKB-C220020-01');

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