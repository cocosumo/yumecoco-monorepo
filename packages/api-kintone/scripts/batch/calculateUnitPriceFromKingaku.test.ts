import { calculateUnitPriceFromKingaku } from './calculateUnitPriceFromKingaku';

describe('calculateUnitPriceFromKingaku', ()=>{
  it('should calculate 単価 from 金額', async ()=>{
    const result = await calculateUnitPriceFromKingaku();

    expect(result).toBeDefined();
  }, 8000);
});
