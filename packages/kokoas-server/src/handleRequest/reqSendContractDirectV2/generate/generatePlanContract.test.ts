import { describe, expect, it } from '@jest/globals';
import { generatePlanContract } from './generatePlanContract';
import path from 'path';
import fs from 'fs';
import { TContractData, getContractDataV2 } from '../getContractDataV2';
import { produce } from 'immer';

describe('generatePlanContract', () => {
  const testContractId = '1de692dc-de27-4001-b946-50e9bbb35b8c';
  const testPath = path.join(__dirname, '__TEST__');
  const contractDataPath = path.join(testPath, 'contractTestData.json');
  let contractData: TContractData = Object.create(null);

  beforeAll( async () => {
    if (!fs.existsSync(testPath)) {
      fs.mkdirSync(testPath);
    }

    if (fs.existsSync(contractDataPath)) {
      contractData = JSON.parse(fs.readFileSync(contractDataPath, 'utf-8'));
    } else {
      // テストの際、取得時間がかかるので、一度取得したデータは保存しておく
      // 最新が必要な場合は、contractDataPathを削除する
      contractData = await getContractDataV2({
        contractId: testContractId,
        signMethod: 'electronic',
      });
      fs.writeFileSync(contractDataPath, JSON.stringify(contractData));
    }

  });
  it('should generate plan contract and save to pdf', async () => {

    const pdf = await generatePlanContract(contractData, 'Uint8Array');
    const savePath = path.join(testPath, 'plancontract.pdf');

    fs.writeFileSync(savePath, pdf);
    expect(fs.existsSync(savePath)).toBe(true);

  });

  it('should generate plan contract base64 and save to pdf', async () => {

    const pdfB64 = await generatePlanContract(contractData, 'base64');
    if (typeof pdfB64 !== 'string') throw new Error('pdfB64 is not string');

    // b64 to Uint8Array
    const pdf = Uint8Array.from(Buffer.from(pdfB64, 'base64'));

    const savePath = path.join(testPath, `plancontract_b64_${new Date().getTime()}.pdf`);

    fs.writeFileSync(savePath, pdf);
    expect(fs.existsSync(savePath)).toBe(true);

  });

  it('should generate 設計契約　details', async () => {
    const mockedData = produce(contractData, draft => {
      draft.purpose = '事務所併用住宅';
      draft.structure = '鉄筋コンクリート造（RC造）';
      draft.scale = '3階建て';
      draft.projPeriod = 60;
      draft.annotation = '建物面積により決定、1.5万/坪目安最低50万～';
    });

    const pdf = await generatePlanContract(mockedData, 'Uint8Array');
    const savePath = path.join(testPath, '用途構造規模.pdf');

    fs.writeFileSync(savePath, pdf);
    expect(fs.existsSync(savePath)).toBe(true);


  });
});