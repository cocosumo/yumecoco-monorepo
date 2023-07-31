import { describe, expect } from '@jest/globals';
import { testData } from './testData';
import { summarizeOrderingCompanyInfo } from './summarizeOrderingCompanyInfo';



describe('summarizeOrderingCompanyInfo', () => {
  it('should summarize ordering company info', async () => {
    const result = await summarizeOrderingCompanyInfo(testData);

    console.log(result);

    expect(result.orderInfo).toHaveLength(15);
  });
});
