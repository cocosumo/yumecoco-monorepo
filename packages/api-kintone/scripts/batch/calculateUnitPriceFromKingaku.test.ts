import { calculateUnitPriceFromKingaku } from './calculateUnitPriceFromKingaku';
import { expect, describe, it } from '@jest/globals';

describe('calculateUnitPriceFromKingaku', ()=>{
  it('should calculate 単価 from 金額', async ()=>{
    const result = await calculateUnitPriceFromKingaku();

    expect(result).toBeDefined();
  }, 8000);
});
