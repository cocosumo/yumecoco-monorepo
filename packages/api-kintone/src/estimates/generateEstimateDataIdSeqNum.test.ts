import { generateEstimateDataIdSeqNum } from './generateEstimateDataIdSeqNum';
import { describe, it, expect } from '@jest/globals';

describe('generateProjDataId', () => {
  it('should generated usable projId', async () => {
    const newDataId = await generateEstimateDataIdSeqNum('KKB-C22-0001');

    console.log(newDataId, newDataId.length);

    expect(newDataId.length).toEqual(15);
  });
});