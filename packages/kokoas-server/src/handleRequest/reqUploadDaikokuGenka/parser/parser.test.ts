import xlsx from 'xlsx';
import path from 'path';
import { parser } from './parser';

describe('parse daikoku xls', () => {
  it('should convert it to designated object type', async () => {
    const workbook = xlsx.readFile(path.join(__dirname, '../__TEST__', '大黒の原価.xls'));

    const result = await parser(workbook);
    const { items, ...other } = result;
    console.log(other);

    expect(result).toHaveProperty('documentTitle');
  });
});