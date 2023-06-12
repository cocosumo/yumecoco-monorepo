import { IProjestimates } from 'types';
import { estimateToAndpadJson } from './estimateToAndpadJson';
import { getEstimateById } from 'api-kintone';


describe('estimateToAndpadJson', () => {
  let testEstimateRec: IProjestimates;


  beforeAll(async () => {
    const testEstimateId = '7f595c5f-09bc-406f-9b0b-5454f2c30d63';
    testEstimateRec = await getEstimateById(testEstimateId);
    expect(testEstimateRec).toBeTruthy();
  });

  it('見積書のレコードから、ANDPADで必要な情報となる情報をJSON形式に抽出します', () => {
    const result = estimateToAndpadJson(testEstimateRec);

    console.log(result);
    expect(result).toBeTruthy();
  }); 
});