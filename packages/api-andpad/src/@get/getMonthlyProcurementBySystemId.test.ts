import { expect, describe, it } from '@jest/globals';
import { getMonthlyProcurementBySystemId } from './getMonthlyProcurementBySystemId';
import fs from 'fs';
import path from 'path';

describe('getMonthlyProcurementBySystemId', () => {
  it('should get data by systemId', async () => {

    const result = await getMonthlyProcurementBySystemId(11908295);

    console.log(result.data.months);

    expect(result).toBeDefined();

    fs.writeFileSync(path.resolve(__dirname, '__TEST__', './getMonthlyProcurementBySystemId.json'), JSON.stringify(result, null, 2));
  }, 60000);

});