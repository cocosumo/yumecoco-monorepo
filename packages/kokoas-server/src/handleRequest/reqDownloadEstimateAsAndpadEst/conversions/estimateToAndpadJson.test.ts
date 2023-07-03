import { IProjestimates } from 'types';
import { estimateToAndpadJson } from './estimateToAndpadJson';
import { getEstimateById } from 'api-kintone';
import { expect, describe, it } from '@jest/globals';


describe('estimateToAndpadJson', () => {
  let testEstimateRec: IProjestimates;


  beforeAll(async () => {
    const testEstimateId = '43131a40-e4b5-4477-a533-1320dc3b7fe1';
    testEstimateRec = await getEstimateById(testEstimateId);
    expect(testEstimateRec).toBeTruthy();
  });

  it('見積書のレコードから、ANDPADで必要な情報となる情報をJSON形式に抽出します', () => {
    const result = estimateToAndpadJson(testEstimateRec);

    console.log(result);
    expect(result).toBeTruthy();
  }); 
});