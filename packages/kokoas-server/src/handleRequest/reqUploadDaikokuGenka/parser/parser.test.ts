import xlsx from 'xlsx';
import path from 'path';
import { parser } from './parser';
import { expect, describe, it } from '@jest/globals';


describe('parse daikoku xls', () => {
  it('should convert it to designated object type', async () => {
    const workbook = xlsx.readFile(path.join(__dirname, '../__TEST__', '大黒の原価.xls'));

    const result = await parser(workbook);

    expect(result).toHaveProperty('documentTitle');
  });
});