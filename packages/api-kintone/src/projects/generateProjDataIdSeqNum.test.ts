import { generateProjDataIdSeqNum } from './generateProjDataIdSeqNum';

describe('generateProjDataId', () => {
  it('should generated usable projId', async () => {
    const newDataId = await generateProjDataIdSeqNum('KKG');

    console.log(newDataId, newDataId.length);

    expect(newDataId.length).toEqual(12);
  });
});