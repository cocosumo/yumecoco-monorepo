import path from 'path';
import { parse } from 'csv-parse';
import iconv from 'iconv-lite';
import fs from 'fs';
import { RecordType } from './config';



const records: RecordType[] = [];

export const parseCSVPostal = async () : Promise<typeof records> => {
  const file = path.join(__dirname, '..', 'assets', 'KEN_ALL.CSV'); 
  return new Promise((resolve, reject) => {
    fs.createReadStream(file)
      .pipe(iconv.decodeStream('SJIS'))
      .pipe(parse({ delimiter: ',', from_line: 2 }))
      .on('data', function (row: string[]) {
        console.log(row);
        records.push({
          postalCode: { value: row[2] },
          prefReading: { value: row[3] },
          cityReading: { value: row[4] },
          townReading: { value: row[5] },
          pref:{ value: row[6] },
          city: { value: row[7] },
          town: { value: row[8] },
        });
      })
      .on('end', function () {
        resolve(records);
      })
      .on('error', reject);

  });



 
};