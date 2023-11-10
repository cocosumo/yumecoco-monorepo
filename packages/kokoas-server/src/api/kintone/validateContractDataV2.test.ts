import { beforeAll, describe, it } from '@jest/globals';
import { getContractById } from 'api-kintone';
import { TContractData } from 'kokoas-server/src/handleRequest/reqSendContractDirectV2/getContractDataV2';
import fs from 'fs';
import path from 'path';
import { produce } from 'immer';


describe('validateContractDataV2', () => {
  const data : TContractData = Object.create(null);

  beforeAll(async () => {
    const testDir = path.resolve(__dirname, './__TEST__');
    const testFile = path.resolve(testDir, 'testContractData.json');

    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir);
    }

    if (!fs.existsSync(testFile)) {
      const newContractData = await getContractById('4958d156-b1ef-421f-88ab-d55b20938134');
      fs.writeFileSync(testFile, JSON.stringify(newContractData));
    } 
    
    const contractDataFromFile : TContractData = JSON.parse(fs.readFileSync(testFile, 'utf8'));

    console.log('contractDataFromFile', contractDataFromFile);
    Object.assign(data, produce(contractDataFromFile, (draft) => {
      draft.cocoAG[0].email = '';
      draft.storeMngrEmail = '';
      draft.accountingEmail = '';
      draft.customers[0].email = '';
    
    }));
  });

  it('契約は電子で、顧客メールがない場合、エラーが出る。', () => {

  });
});