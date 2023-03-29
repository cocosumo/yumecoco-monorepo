import { updateInvoices } from './updateInvoices';

describe('invoice', () => {
  it('should update invoice by id', async () => {

    const updateRec = [{
      id: 90,
      record: {
        invoiceStatus: { value: 'testUpdate' },
      },
    },
    {
      id: 91,
      record: {
        invoiceStatus: { value: 'testUpdate' },
      },
    },
    ];

    const resDat = await updateInvoices({ records: updateRec });


    console.log('resDat', resDat);
    /* expect(resDat).toEqual(
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
    ); */
  }, 10000);
});