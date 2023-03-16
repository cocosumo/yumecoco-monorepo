import { IProjestimates } from 'types';
import { estimateToAndpadJson } from './estimateToAndpadJson';
import { getEstimateById } from 'api-kintone';


describe('estimateToAndpadJson', () => {
  let testEstimateRec: IProjestimates;


  beforeAll(async () => {
    const testEstimateId = 'fc8f798a-a73f-4447-b4bb-99d51da2f198';
    testEstimateRec = await getEstimateById(testEstimateId);
    expect(testEstimateRec).toBeTruthy();
  });

  it('Andpadで必要な見積のレコード情報をJSON形式に変換します', () => {
    const result = estimateToAndpadJson(testEstimateRec);
    expect(result).toBeTruthy();
  }); 
});