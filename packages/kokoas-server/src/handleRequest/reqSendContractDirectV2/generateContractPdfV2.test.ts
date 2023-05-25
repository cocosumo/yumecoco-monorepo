import fs from 'fs';
import fsPromise from 'fs/promises';
import path from 'path';
import { getContractDataV2 } from 'kokoas-server/src/handleRequest/reqSendContractDirectV2/getContractDataV2';
import { generateContractPdfV2 } from './generateContractPdfV2';
import { TSignMethod } from 'types';

describe('Contract', () => {
  const contractId = '1de692dc-de27-4001-b946-50e9bbb35b8c';
  const ukeoiDocVersion = '20230523';
  

  const generateAndSavePdf = async (
    signMethod: TSignMethod,
  ): Promise<string> => {
    const contractData = await getContractDataV2({
      contractId,
      signMethod,
      ukeoiDocVersion,
    });

    console.log(contractData);

    const pdf = await generateContractPdfV2(contractData, 'Uint8Array ', ukeoiDocVersion);
    const savePath = path.join(__dirname, '__TEST__', `ukeoiV2_${signMethod}.test.pdf`);

    await fsPromise.writeFile(savePath, pdf);
    return savePath;
  };

  const checkPdfExists = async (savePath: string): Promise<boolean> => {
    return fs.existsSync(savePath);
  };

  it('should generate wetink contract in pdf', async () => {
    const savePath = await generateAndSavePdf('wetInk');
    expect(await checkPdfExists(savePath)).toBe(true);
  }, 60000);

  it('should generate electronic contract in pdf', async () => {
    const savePath = await generateAndSavePdf('electronic');
    expect(await checkPdfExists(savePath)).toBe(true);
  }, 60000);
});