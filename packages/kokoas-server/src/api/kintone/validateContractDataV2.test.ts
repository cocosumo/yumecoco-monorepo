

import { beforeAll, describe, expect, it } from '@jest/globals';
import { TContractData, getContractDataV2 } from 'kokoas-server/src/handleRequest/reqSendContractDirectV2/getContractDataV2';
import fs from 'fs';
import path from 'path';
import { produce } from 'immer';
import { validateContractData } from './validateContractDataV2';


const serviceProjTypeid = '3b450da3-19fe-45bd-2406-3ded7f44fe86';

describe('validateContractDataV2', () => {
  const testData : TContractData = Object.create(null);
  beforeAll(async () => {
    const testContractId = '4958d156-b1ef-421f-88ab-d55b20938134';
    const testDir = path.resolve(__dirname, './__TEST__');
    const testFile = path.resolve(testDir, 'testContractData.json');
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir);
    }

    if (!fs.existsSync(testFile)) {
      const newContractData = await getContractDataV2({
        contractId: testContractId,
        signMethod: 'electronic',
      });
      fs.writeFileSync(testFile, JSON.stringify(newContractData));
    } 
    
    const contractDataFromFile : TContractData = JSON.parse(fs.readFileSync(testFile, 'utf8'));

    // 初期設定
    Object.assign(testData, produce(contractDataFromFile, (draft) => {
      draft.cocoAG[0].email = 'test@test.com';
      draft.storeMngrEmail = 'test@test.com';
      draft.accountingEmail = 'test@test.com';
      draft.customers[0].email = 'test@test.com';
      draft.projTypeId = '111111111111111111111'; // 

    }));
  });
  it('契約は電子で、顧客メールがない場合、エラーが発生する', () => {
    const data = produce(testData, (draft) => {
      draft.signMethod = 'electronic';
      draft.customers[0].email = ''; //  顧客メールがない
    });

    expect(() => {
      validateContractData(data);
    }).toThrowError();

  });

  it('電子契約の場合、顧客のメールアドレスが存在すれば、エラーは発生しない', () => {
    const data = produce(testData, (draft) => {
      draft.signMethod = 'electronic';
      draft.customers[0].email = 'test@test.com'; // 顧客メールがある
    });

    expect(() => {
      validateContractData(data);
    }).not.toThrowError();
  });

  it('電子契約で、工事種別がサービス工事の場合、顧客のメールアドレスが存在しなくてもエラーは発生しない', () => {
    const data = produce(testData, (draft) => {
      draft.signMethod = 'electronic';
      draft.customers[0].email = ''; // 顧客メールがない
      draft.projTypeId = serviceProjTypeid; // 工事種別はサービス工事
    });

    expect(() => {
      validateContractData(data);
    }).not.toThrowError();
  });

  // TODO　他のパターンもテストする
});