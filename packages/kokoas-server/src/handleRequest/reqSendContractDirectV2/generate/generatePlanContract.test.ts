import { describe, expect, it } from '@jest/globals';
import { generatePlanContract } from './generatePlanContract';
import path from 'path';
import fs from 'fs';
import { getContractDataV2 } from '../getContractDataV2';

describe('generatePlanContract', () => {
  const testPath = path.join(__dirname, '__TEST__');
  beforeAll(() => {
    if (!fs.existsSync(testPath)) {
      fs.mkdirSync(testPath);
    }
  });
  it('should generate plan contract and save to pdf', async () => {
    const contractData = await getContractDataV2({
      contractId: '1de692dc-de27-4001-b946-50e9bbb35b8c',
      signMethod: 'electronic',
    });
    const pdf = await generatePlanContract(contractData, 'Uint8Array');
    const savePath = path.join(testPath, `plancontract_${new Date().getTime()}.pdf`);

    fs.writeFileSync(savePath, pdf);
    expect(fs.existsSync(savePath)).toBe(true);

  });

  it('should generate plan contract base64 and save to pdf', async () => {
    const contractData = await getContractDataV2({
      contractId: '1de692dc-de27-4001-b946-50e9bbb35b8c',
      signMethod: 'electronic',
    });
    const pdfB64 = await generatePlanContract(contractData, 'base64');
    if (typeof pdfB64 !== 'string') throw new Error('pdfB64 is not string');

    // b64 to Uint8Array
    const pdf = Uint8Array.from(Buffer.from(pdfB64, 'base64'));

    const savePath = path.join(testPath, `plancontract_b64_${new Date().getTime()}.pdf`);

    fs.writeFileSync(savePath, pdf);
    expect(fs.existsSync(savePath)).toBe(true);

  });
});