import { getInvoiceByEstDataId } from './getInvoiceByEstDataId';

describe('getInvoiceByEstDataId', () => {
  it('should get invoice by estDataId', async () => {
    const testDataId = 'KKB-C220027-01';

    const { 
      records,
      totalCount,
    } = await getInvoiceByEstDataId(testDataId);

    console.log('請求内容', totalCount, '件');

    expect(records.every(({ 
      estimateLists,
      invoiceStatus,
    }) => {
      return estimateLists.value.some(({ value: {
        dataId,
      } }) => dataId.value === testDataId &&
        (invoiceStatus.value === 'sent' || invoiceStatus.value === 'created'));
    })).toBe(true);

  }, 10000);
});