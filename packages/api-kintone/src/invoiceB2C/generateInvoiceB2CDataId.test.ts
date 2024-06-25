import { describe, expect, it } from '@jest/globals';
import { generateInvoiceB2CDataId, invoiceB2CDataIdmaxPadding } from './generateInvoiceB2CDataId';
import format from 'date-fns/format';



describe('generateInvoiceB2CDataId', () => {
  it('should return invoiceB2CDataId', async () => {
    // Should have existing data to test against.
    // If there is no existing data, it will be 1.
    const {
      newInvoiceDataId,
      latestRecord,
    } = await generateInvoiceB2CDataId();

    const latestRecordInvoiceB2CDataId = latestRecord?.invoiceDataId.value
      || `${format(new Date(), 'yyMMdd')}-${(0).toString().padStart(invoiceB2CDataIdmaxPadding, '0')}`;

    const incrementedId = Number(latestRecordInvoiceB2CDataId.slice(-invoiceB2CDataIdmaxPadding)) + 1;
    const expectedNewInvoiceB2CDataId = `${latestRecordInvoiceB2CDataId?.slice(0, 6)}-${incrementedId.toString().padStart(invoiceB2CDataIdmaxPadding, '0')}`;

    console.log('Incremented ID:', incrementedId);
    console.log('latest record B2C invoice data id:', latestRecordInvoiceB2CDataId);
    console.log('expected new B2C inovice data id:', expectedNewInvoiceB2CDataId);

    expect(newInvoiceDataId).toBe(expectedNewInvoiceB2CDataId);
  });
});
