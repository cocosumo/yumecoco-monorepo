import { describe } from '@jest/globals';
import { generateContractReport } from './generateContractReport';
import fs from 'fs';
import path from 'path';

describe('generateContractReport', () => {
  it('should return base64Img', async () => {
    
    const base64 = await generateContractReport('191ff145-9e3a-4065-a497-6d17a9501be5');


    const savePath = path.join(__dirname, '__TEST__', 'test.png');

    const fileTosave = base64.split(',')[1];

    // console.log(fileTosave);


    // save base64 to image
    fs.writeFileSync(savePath, fileTosave, 'base64');
        
  });
});