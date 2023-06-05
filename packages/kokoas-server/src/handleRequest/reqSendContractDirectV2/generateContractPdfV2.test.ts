import fsPromise from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { getContractDataV2 } from 'kokoas-server/src/handleRequest/reqSendContractDirectV2/getContractDataV2';
import { generateContractPdfV2 } from './generateContractPdfV2';

describe('Contract', () => {
  it('should generate contract in pdf', async () =>{
    const contractData = await getContractDataV2({
      contractId: '1de692dc-de27-4001-b946-50e9bbb35b8c',
      signMethod: 'electronic',
      ukeoiDocVersion: '20230523',
    });

    
    for (let i = 1; i <= 3 ; i++) {
      // limit number of customers based on i
      const mockData : Awaited<ReturnType<typeof getContractDataV2>> = {
        ...contractData,
        customers: contractData.customers.slice(0, i),
      };
      const pdf = await generateContractPdfV2(mockData, 'Uint8Array ', '20230523');
      const savePath = path.join(__dirname, '__TEST__', `ukeoi_custcount_${i}.pdf`);
      await fsPromise.writeFile(savePath, pdf);
      expect(fs.existsSync(savePath)).toBe(true);
    }
   
  }, 60000);


  
});
