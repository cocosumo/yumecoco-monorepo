import { getCocoAreaMngrByTerritory } from './getCocoAreaMngrByTerritory';
import { describe, it, expect } from '@jest/globals';

describe('getCocoAreaMngrByTerritory', () => {
  it('should get cocosumo area manager by territory', async () => {
    const result = await getCocoAreaMngrByTerritory('東');
    console.log(result);
    expect(result.役職.value).toEqual('店長');
  });
});