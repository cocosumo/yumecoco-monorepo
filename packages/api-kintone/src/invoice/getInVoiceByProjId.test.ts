import { getInvoiceByProjId } from './getInvoiceByProjId';

describe('invoice', () => {
  it('should get invoice by id', async () => {

    const record = await getInvoiceByProjId('123');

    console.log('請求件数', record.length);

    expect(record).toEqual(
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
  }, 10000 );
});