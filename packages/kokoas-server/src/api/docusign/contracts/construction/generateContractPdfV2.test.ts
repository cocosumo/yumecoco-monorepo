import fsPromise from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { getContractDataV2 } from 'kokoas-server/src/api/kintone/getContractDataV2';
import { generateContractPdfV2 } from './generateContractPdfV2';

describe('Contract', () => {
  it('should generate contract in pdf', async () =>{
    const contractData = await getContractDataV2({
      contractId: '12128397-14e7-47d5-90b6-f8b655b39988',
    });

    console.log(contractData);
    const pdf = await generateContractPdfV2(contractData, 'Uint8Array ');
    const savePath = path.join(__dirname, '__TEST__', 'ukeoiV2.test.pdf');

    await fsPromise.writeFile(savePath, pdf);

    expect(fs.existsSync(savePath)).toBe(true);
  }, 60000);
});
