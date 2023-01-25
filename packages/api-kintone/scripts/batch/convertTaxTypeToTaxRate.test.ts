import { convertTaxTypeToTaxRate } from './convertTaxTypeToTaxRate';

describe('convertTaxTypeToTaxRate', ()=>{
  it('should covert taxType to from 税率', async ()=>{
    const result = await convertTaxTypeToTaxRate();

    expect(result).toBeDefined();
  }, 8000);
});
