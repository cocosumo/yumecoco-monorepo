import fsPromise from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { getContractDataV2 } from 'kokoas-server/src/handleRequest/reqSendContractDirectV2/getContractDataV2';
import { generateContractPdfV2 } from './generateContractPdfV2';
import { produce } from 'immer';
import { fakerJA as faker } from '@faker-js/faker';
import { getProjTypes } from 'api-kintone';

const latestUkeoiDocVersion = '20230605';

describe('Contract', () => {
  it('should generate contract in pdf', async () =>{
    const contractData = await getContractDataV2({
      contractId: '1de692dc-de27-4001-b946-50e9bbb35b8c',
      signMethod: 'electronic',
      ukeoiDocVersion: latestUkeoiDocVersion,
    });

    
    for (let i = 1; i <= 3 ; i++) {
      // limit number of customers based on i
      const mockData : Awaited<ReturnType<typeof getContractDataV2>> = {
        ...contractData,
        // Mock ISO Dates
        startDate: '2021-06-01T00:00:00.000Z',
        finishDate: '2021-06-30T00:00:00.000Z', 
        deliveryDate: '2021-07-01T00:00:00.000Z',

        contractDate: '2021-05-31T00:00:00.000Z',
        
        customers: contractData.customers.slice(0, i),
        payments: produce(contractData.payments, draft => {
          draft[0].paymentAmt = 10000;
          draft[1].paymentAmt = 10000;
          draft[2].paymentAmt = 10000;
          draft[3].paymentAmt = 10000;
          draft[4].paymentAmt = 10000;
        }),
      };
      const pdf = await generateContractPdfV2(mockData, 'Uint8Array ', latestUkeoiDocVersion);
      const savePath = path.join(__dirname, '__TEST__', `ukeoi_custcount_${i}.pdf`);
      await fsPromise.writeFile(savePath, pdf);
      expect(fs.existsSync(savePath)).toBe(true);
    }
   
  }, 60000);

  it("should automatically adjust font-size of customer's name depending on available space", async () => {
    const contractData = await getContractDataV2({
      contractId: '1de692dc-de27-4001-b946-50e9bbb35b8c',
      signMethod: 'electronic',
      ukeoiDocVersion: latestUkeoiDocVersion,
    });

    const projTypesRec = await getProjTypes();
    const projTypes = projTypesRec.map(projType => projType.label.value);

    for (let i = 1; i <= 4; i++) {
      const nameLength = i * 10;
      const mockData : Awaited<ReturnType<typeof getContractDataV2>> = produce(contractData, draft => {
        draft.projName = ('ア').repeat(nameLength) + ' ' + faker.helpers.arrayElement(projTypes);
      });

      const pdf = await generateContractPdfV2(mockData, 'Uint8Array ', latestUkeoiDocVersion);
      const savePath = path.join(__dirname, '__TEST__', `ukeoi_custNameLength_${nameLength}.pdf`);
      await fsPromise.writeFile(savePath, pdf);
      expect(fs.existsSync(savePath)).toBe(true);
    }
  }, 60000);

  it('should automatically adjust font-size of 工事場所 depending on available space', async () => {
    const contractData = await getContractDataV2({
      contractId: '1de692dc-de27-4001-b946-50e9bbb35b8c',
      signMethod: 'electronic',
      ukeoiDocVersion: latestUkeoiDocVersion,
    });

    for (let i = 1; i <= 4; i++) {
      const length = i * 4;
      const mockData : Awaited<ReturnType<typeof getContractDataV2>> = produce(contractData, draft => {
        draft.projLocation = `〒${faker.location.zipCode()} ${faker.location.state()}${faker.location.city().repeat(length)}１９番地１６レジデンスなかま９９９号室`;
      });

      const pdf = await generateContractPdfV2(mockData, 'Uint8Array ', latestUkeoiDocVersion);
      const savePath = path.join(__dirname, '__TEST__', `ukeoi_projLocLength_${mockData.projLocation.length}.pdf`);
      await fsPromise.writeFile(savePath, pdf);
      expect(fs.existsSync(savePath)).toBe(true);
    }
  }, 60000);
  
});
