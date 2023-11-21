import { filePath } from '../config';
import fs from 'fs';
import Papa from 'papaparse';
import { AndpadCsv } from '../types/types';


/**
 * ANDPADの入金一覧csvファイルを取得します
 */
export const getAndpadPaymentsCsv = () => {

  const data = fs.readFileSync(filePath, 'utf8');
  const result = Papa.parse(data, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  }) as AndpadCsv;
  

  return result;
};
