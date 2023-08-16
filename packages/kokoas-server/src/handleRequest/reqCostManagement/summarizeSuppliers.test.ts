import { describe, expect } from '@jest/globals';
import { summarizeSuppliers } from './summarizeSuppliers';
import { getAndpadProcurementByAndpadProjId } from 'api-kintone';



describe('summarizeOrderingCompanyInfo', () => {
  it('should summarize ordering company info', async () => {
    const andpadSystemId = '11487098';
    const andpadProcurements = await getAndpadProcurementByAndpadProjId(andpadSystemId); // andpad発注情報
    const result = summarizeSuppliers(andpadProcurements);

    console.log(result);

    expect(result.orderInfo).toHaveLength(15);
  });
});
