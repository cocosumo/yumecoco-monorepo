import fsPromise from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { getContractDataV2 } from 'kokoas-server/src/handleRequest/reqSendContractDirectV2/getContractDataV2';
import { generateContractPdfV2 } from './generateContractPdfV2';

describe('Contract', () => {
  it('should generate contract in pdf', async () =>{
    const contractData = await getContractDataV2({
      contractId: '1de692dc-de27-4001-b946-50e9bbb35b8c',
      signMethod: 'wetInk',
      ukeoiDocVersion: '20230523',
    });

    console.log(contractData);
    const pdf = await generateContractPdfV2(contractData, 'Uint8Array ', '20230523');
    const savePath = path.join(__dirname, '__TEST__', 'ukeoiV2.test.pdf');

    await fsPromise.writeFile(savePath, pdf);

    expect(fs.existsSync(savePath)).toBe(true);
  }, 60000);
});
