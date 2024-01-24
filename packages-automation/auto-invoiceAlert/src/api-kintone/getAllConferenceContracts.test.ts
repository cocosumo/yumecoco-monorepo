import { describe, it, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { getAllConferenceContracts } from './getAllConferenceContracts';


describe('getAllConferenceContracts', () => {
  it('会議資料用契約書アプリの全レコードを取得します', async () => {
    const result = await getAllConferenceContracts();

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].$id).toBeDefined();

    console.log(`件数：${result.length} 件`);

    const dir = path.join(__dirname, '__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // save json file
    fs.writeFileSync(
      path.join(dir, `getAllConferenceContracts_${format(new Date(), 'yyyyMMddHHmmss')}.json`),
      JSON.stringify(result, null, 2),
    );
  }, 100000);
});
