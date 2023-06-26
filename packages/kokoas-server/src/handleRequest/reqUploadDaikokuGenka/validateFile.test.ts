import path from 'path';
import xlsx from 'xlsx';
import { validateFile } from './validateFile';
import { expect, describe, it } from '@jest/globals';


describe('file', () => {
  it('should validate file', async () => {
    const workbook = xlsx.readFile(path.join(__dirname, '__TEST__', '大黒の原価.xls'));
    const result = await validateFile(workbook);

    expect(result).toBeTruthy();
  });
});