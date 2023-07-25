import { describe } from '@jest/globals';
import { generateContractReport } from './generateContractReport';
import fs from 'fs';
import path from 'path';

describe('generateContractReport', () => {
  it('should return base64Img', async () => {
    
    const base64 = await generateContractReport('contractId');


    const savePath = path.join(__dirname, 'test.png');

    const fileTosave = base64.split(',')[1];

    // console.log(fileTosave);


    // save base64 to image
    fs.writeFileSync(savePath, fileTosave, 'base64');
        
  });
});