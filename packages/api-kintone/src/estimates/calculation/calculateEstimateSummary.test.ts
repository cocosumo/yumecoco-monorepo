import { EstRowFields, calculateEstimateSummary } from './calculateEstimateSummary';
import { describe, it, expect } from '@jest/globals';

describe('calculateEstimateSummary', () => {
  const testData: EstRowFields[] = [
    {
      rowUnitPriceBeforeTax: 500,
      rowCostPrice: 50,
      isTaxable: true,
      quantity: 1,
    },
    {
      rowUnitPriceBeforeTax: 1000,
      rowCostPrice: 100,
      isTaxable: true,
      quantity: 1,
    },
    {
      rowUnitPriceBeforeTax: -10,
      rowCostPrice: -10,
      isTaxable: true,
      quantity: 1,
    },
    {
      rowUnitPriceBeforeTax: -50,
      rowCostPrice: -50,
      isTaxable: true,
      quantity: 1,
    },
    {
      // must be ignored in totals since quantity is 0
      rowUnitPriceBeforeTax: 100000,
      rowCostPrice: 1000,
      isTaxable: true,
      quantity: 0, 
    },
  ]; 

  const {
    totalDiscountAmount,
    totalAmountBeforeDiscount,
    totalTaxAmount,
    totalAmountBeforeTax,
    totalAmountAfterTax,
  }  = calculateEstimateSummary(testData, 0.1);


  
  it('正しい割引額を返す', () => {
    expect(totalDiscountAmount).toBe(-60);
  });

  it('正しい非割引額を返す', () => {
    expect(totalAmountBeforeDiscount).toBe(1500);
  });

  it('正しい税額を返す', () => {
    expect(totalTaxAmount).toBe(144);
  });

  it('正しい税抜き金額を返す', () => {
    expect(totalAmountBeforeTax).toBe(1440);
  });

  it('正しい税込み金額を返す', () => {
    expect(totalAmountAfterTax).toBe(1584);
  });

  // TODO: その他テストを追加する
});