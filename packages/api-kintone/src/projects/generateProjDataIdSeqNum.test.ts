import { generateProjDataIdSeqNum } from './generateProjDataIdSeqNum';

describe('generateProjDataId', () => {
  it('should generated usable projId', async () => {
    const newDataId = await generateProjDataIdSeqNum('KKB');

    console.log(newDataId, newDataId.length);

    expect(newDataId.length).toEqual(13);
  });
});