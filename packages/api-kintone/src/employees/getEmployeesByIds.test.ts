import { expect, describe, it } from '@jest/globals';
import { RecordType } from './config';
import { getEmployeesByIds } from './getEmployeesByIds';

describe('getEmployeesByIds', () =>{
  const existingEmpIds = ['69', '68', '70'];
  let records: RecordType[] = [];

  beforeAll(async () => {
    const result = await getEmployeesByIds(existingEmpIds);
    records = result.records;
  });
  it('should get employees by existing ids', async () => {
    const retrievedIds = records.map(({ $id }) => $id.value );
    expect(retrievedIds.sort()).toEqual(existingEmpIds.sort());
  });

});