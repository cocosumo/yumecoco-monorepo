import { RecordKey } from './config';
import { searchProjects } from './searchProjects';
import { describe, it, expect } from '@jest/globals';



describe('search projects', () => {
  it('should search projects', async () => {
    const testData = '123';

    const searchFields : RecordKey[] = [
      'projName', 
      '$id', 
      'store', 
      'address1', 
      'address2', 
    ]; 

    const results = await searchProjects(testData);

    expect(results
      .every((rec) => searchFields
        .some((fld) => (rec[fld].value as string).includes(testData))))
      .toBeTruthy();
  });
});