import { getContractById } from 'api-kintone';
import { convertContractToForm } from './convertContractToForm';
import { describe, it, expect } from '@jest/globals';

describe('convertContractToForm', () => {
  it('契約レコードをフォームに変換する', async () => {
    const testId  = '82bd1a22-ae6f-428c-a80b-2f12f72befc8';
    const data = await getContractById(testId);
  
    expect(data.uuid.value).toEqual(testId);

    const result = convertContractToForm(data);

    console.log(result, data);
  });

});