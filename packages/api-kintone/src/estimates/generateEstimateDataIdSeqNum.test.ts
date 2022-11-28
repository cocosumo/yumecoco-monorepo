import { generateEstimateDataIdSeqNum } from './generateEstimateDataIdSeqNum';

describe('generateProjDataId', () => {
  it('should generated usable projId', async () => {
    const newDataId = await generateEstimateDataIdSeqNum('KKG-C22-00003');

    console.log(newDataId, newDataId.length);

    expect(newDataId.length).toEqual(13);
  });
});