import { describe, expect } from '@jest/globals';
import { getAndpadProcurementByAndpadProjId } from './getAndpadProcurementByAndpadProjId';
import fs from 'fs';
import path from 'path';

describe('getAndpadProcurementByAndpadProjId.test', () => {
  it('should get andpad orders by andpadProjId', async () => {
    const systemId = '11648284';
    const result = await getAndpadProcurementByAndpadProjId(systemId);

    console.log(result);

    expect(result).toBeDefined();

    const dir = path.join(__dirname, '/__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFileSync(
      path.resolve(dir, `./getAndpadProcurementByAndpadProjId${systemId}.json`),
      JSON.stringify(result, null, 2),
    );
  });
});
