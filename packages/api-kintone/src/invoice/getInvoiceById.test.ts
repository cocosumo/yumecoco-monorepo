import { getInvoiceById } from './getInvoiceById';


describe('invoice', () => {
  it('should get invoice by id', async () => {

    const recInvoice = await getInvoiceById('aed8683f-d1f7-4521-b765-d87acb867451');

    console.log('請求書データ', recInvoice);

    expect(recInvoice).toEqual(
      expect.objectContaining({
        $id: {
          type: expect.any(String),
          value: expect.any(String),
        },
      }),
    );
  }, 10000);
});