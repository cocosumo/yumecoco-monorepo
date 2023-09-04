import { describe, it, expect } from '@jest/globals';
import { TimePeriod, getContractsByUpdateDate } from './getContractsByUpdateDate';

describe('getContractsByUpdateDate', () => {
  it('更新日時から契約を取得する', async () => {
    const number = 1;
    const period: TimePeriod = 'WEEKS';
    
    const result = await getContractsByUpdateDate(number, period);

    console.log('result:::', result);

    expect(result).toBeInstanceOf(Array);

    expect(result[0].$id).toBeDefined();
    // expect(result[0].$id).toBeDefined();
    
  });

});