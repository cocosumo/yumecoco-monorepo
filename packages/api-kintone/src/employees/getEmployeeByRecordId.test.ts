import { describe, expect, it } from '@jest/globals';
import { getEmployeeByRecordId } from './getEmployeeByRecordId';

describe('getEmployeeByRecordId', () => {
  it('should return employee', async () => {
    const employeeRec = await getEmployeeByRecordId('182'); // My record ID
    console.log(employeeRec);

    expect(employeeRec).toHaveProperty('record');
  });
});