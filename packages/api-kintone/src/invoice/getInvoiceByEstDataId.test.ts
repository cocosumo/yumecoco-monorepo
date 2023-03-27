import { getInvoiceByEstDataId } from './getInvoiceByEstDataId';

describe('getInvoiceByEstDataId', () => {
  it('should get invoice by estDataId', async () => {
    const testDataId = 'KKB-C220027-01';

    const { records } = await getInvoiceByEstDataId(testDataId);

    console.log('請求内容', records.length, '件');

    expect(records.every(({ estimateLists }) => {
      return estimateLists.value.some(({ value: {
        dataId,
      } }) => dataId.value === testDataId);
    })).toBe(true);

  }, 10000);
});