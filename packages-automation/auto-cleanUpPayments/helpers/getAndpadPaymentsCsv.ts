import { filePath } from '../config';
import fs from 'fs';
import Papa from 'papaparse';
import { AndpadCsvData } from '../types/types';


/**
 * ANDPADの入金一覧csvファイルを取得します
 */
export const getAndpadPaymentsCsv = () => {

  const data = fs.readFileSync(filePath, 'utf8');
  const result = Papa.parse<AndpadCsvData>(data, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });


  return result;
};


export type GetAndpadPaymentsReturn = ReturnType<typeof getAndpadPaymentsCsv>;
