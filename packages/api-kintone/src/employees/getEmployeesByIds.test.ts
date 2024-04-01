import { expect, describe, it } from '@jest/globals';
import { getEmployeesByIds } from './getEmployeesByIds';

describe('getEmployeesByIds', () =>{
  const existingEmpIds = ['efce6ca1-48ae-4001-a9f5-0c92ad3a73c7', 'c41b4d70-8fe3-4277-99be-25d794a757f0'];
  
  it('should get employees by existing ids', async () => {
    const result = await getEmployeesByIds(existingEmpIds);
    const records = result.records;
    const resultIds = records.map(({ uuid }) => uuid.value);

    expect(resultIds).toEqual(existingEmpIds);
  });

});