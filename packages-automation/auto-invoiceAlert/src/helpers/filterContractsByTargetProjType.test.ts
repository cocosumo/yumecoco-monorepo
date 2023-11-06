import { describe, it, expect } from '@jest/globals';
import { filterContractsByTargetProjType } from './filterContractsByTargetProjType';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';


describe('filterContractsByTargetProjType', () => {
  it('should return alert date', async () => {

    // env設定の確認
    console.log('env_mode', process.env);



    const result = await filterContractsByTargetProjType();

    const dir = path.join(__dirname, '__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // save json file
    fs.writeFileSync(
      path.join(dir, `filterContracts_${format(new Date(), 'yyyyMMddHHmmss')}.json`),
      JSON.stringify(result, null, 2),
    );

    // 配列であることを確認
    expect(Array.isArray(result)).toBe(true);

    // 配列の長さが1以上であることを確認
    expect(result.length).toBeGreaterThan(0);

  });
});
