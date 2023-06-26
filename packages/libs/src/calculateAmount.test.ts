import { calculateAmount } from './calculateAmount';
import { expect, describe, it } from '@jest/globals';

describe('calculateAmount', () => {

  it('when amountAfterTax and profitRate are given, calculate other values', () => {
    const given = {
      taxRate: 0.1,
      amountAfterTax: 110,
      profitRate: 0.20,
    };

    const result = calculateAmount(given);

    console.log(result);

    expect(result.amountAfterTax).toEqual(given.amountAfterTax);
    expect(result.profitRate).toEqual(given.profitRate);
    expect(result.amountBeforeTax).toEqual(100);
    expect(result.costPrice).toEqual(80);    
    expect(result.profit).toEqual(20);
  
  });

});