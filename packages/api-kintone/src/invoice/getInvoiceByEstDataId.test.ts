import { getInvoiceByEstDataId } from './getInvoiceByEstDataId';

describe('getInvoiceByEstDataId', () => {
  it('should get invoice by estDataId', async () => {
    const testDataId = 'KKB-C220020-01';

    const {
      records,
      // totalCount,
    } = await getInvoiceByEstDataId(testDataId);

    // console.log('請求内容', totalCount, '件', records);

    expect(records.every(({ estimateLists }) => {
      return estimateLists.value.some(({ value: {
        dataId,
      } }) => dataId.value === testDataId);
    })).toBe(true);

  }, 10000);
});