import { IProjestimates } from 'types';
import { estimateToAndpadJson } from './estimateToAndpadJson';
import { getEstimateById } from 'api-kintone';
import { expect, describe, it } from '@jest/globals';


describe('estimateToAndpadJson', () => {
  let testEstimateRec: IProjestimates;


  beforeAll(async () => {
    const testEstimateId = 'fc8f798a-a73f-4447-b4bb-99d51da2f198';
    testEstimateRec = await getEstimateById(testEstimateId);
    expect(testEstimateRec).toBeTruthy();
  });

  it('見積書のレコードから、ANDPADで必要な情報となる情報をJSON形式に抽出します', () => {
    const result = estimateToAndpadJson(testEstimateRec);
    expect(result).toBeTruthy();
  }); 
});