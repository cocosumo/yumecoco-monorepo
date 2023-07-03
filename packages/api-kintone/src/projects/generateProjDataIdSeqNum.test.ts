import { generateProjDataIdSeqNum } from './generateProjDataIdSeqNum';
import { describe, it, expect } from '@jest/globals';

describe('generateProjDataId', () => {
  it('should generated usable projId', async () => {
    const newDataId = await generateProjDataIdSeqNum('KKG');

    console.log(newDataId, newDataId.length);

    expect(newDataId.length).toEqual(12);
  });
});