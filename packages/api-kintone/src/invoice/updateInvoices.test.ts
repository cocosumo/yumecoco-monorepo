import { updateInvoices } from './updateInvoices';

describe('invoice', () => {
  it('should update invoice by id', async () => {
    const newStatus = 'sent';

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

    const resDat = await updateInvoices(updateRec);

    console.log('resDat', resDat);

    expect(resDat).toMatchObject({
      records: expect.arrayContaining([
        expect.objectContaining({ id: '90' }),
        expect.objectContaining({ id: '91' }),
      ]),
    });
  }, 10000);
});
