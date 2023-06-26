import { getContractById } from 'api-kintone';
import { convertContractToForm } from './convertContractToForm';
import { describe, it, expect } from '@jest/globals';

describe('convertContractToForm', () => {
  it('契約レコードをフォームに変換する', async () => {
    const testId  = 'b91be281-11d3-4ffd-87a2-f1e92a22d31b';
    const data = await getContractById(testId);
  
    expect(data.uuid.value).toEqual(testId);

    const result = await convertContractToForm(data);

    console.log(result, data);
  });

});