import { updateInvoices } from './updateInvoices';

describe('invoice', () => {
  it('should update invoice by id', async () => {
    const newStatus = 'testUpdate';

    const updateRec = [{
      id: 90,
      record: {
        invoiceStatus: { value: newStatus },
      },
    },
    {
      id: 91,
      record: {
        invoiceStatus: { value: newStatus },
      },
    },
    ];

    const resDat = await updateInvoices({ records: updateRec });
    /* resDat {
      records: [ { id: '90', revision: '13' }, { id: '91', revision: '11' } ]
    } */

    console.log('resDat', resDat);

    expect(resDat).toEqual(
      expect.arrayContaining(
        [
          expect.objectContaining({
            $id: {
              value: expect.any(String),
            },
          }),
        ],
      ),
    );
  }, 10000);
});
