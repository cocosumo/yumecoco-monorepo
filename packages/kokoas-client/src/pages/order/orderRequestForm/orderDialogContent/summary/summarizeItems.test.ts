import { describe, expect, it } from '@jest/globals';
import { TOrderForm } from '../../schema';
import { summarizeItems } from './summarizeItems';

/**
 * Test data are casted to TOrderForm['selectedItems']
 * to let us provide minimum required properties.
*/

describe('summarizeItems', () => {
  it('should summarize where all items are 10% tax', () => {
    const testData = [
      {
        rowCostPriceBeforeTax: 100,
        taxRate: 0.1,
      },
      {
        rowCostPriceBeforeTax: 200,
        taxRate: 0.1,
      },
      {
        rowCostPriceBeforeTax: 300,
        taxRate: 0.1,
      },
    ] as TOrderForm['selectedItems'];

    expect(summarizeItems(testData)).toEqual({
      groupedByTaxArray: [
        ['10', 600],
      ],
      totalTaxAmount: 60,
      nonTaxableAmount: 0,
      totalAmount: 660,
    });
  });

  it('should summarize where items are 10% tax and 0% tax', () => {
    const testData = [
      {
        rowCostPriceBeforeTax: 100,
        taxRate: 0.1,
      },
      {
        rowCostPriceBeforeTax: 200,
        taxRate: 0,
      },
      {
        rowCostPriceBeforeTax: 300,
        taxRate: 0,
      },
    ] as TOrderForm['selectedItems'];

    expect(summarizeItems(testData)).toEqual({
      groupedByTaxArray: [
        ['10', 100],
      ],
      totalTaxAmount: 10,
      nonTaxableAmount: 500,
      totalAmount: 610,
    });
  });

  it('should summarize where items are 10% tax and 8% tax', () => {
    const testData = [
      {
        rowCostPriceBeforeTax: 100,
        taxRate: 0.1,
      },
      {
        rowCostPriceBeforeTax: 200,
        taxRate: 0.08,
      },
      {
        rowCostPriceBeforeTax: 300,
        taxRate: 0.08,
      },
    ] as TOrderForm['selectedItems'];

    expect(summarizeItems(testData)).toEqual({
      groupedByTaxArray: [
        ['10', 100],
        ['8', 500],
      ],
      totalTaxAmount: 50,
      nonTaxableAmount: 0,
      totalAmount: 650,
    });
  });

  it('should summarize where items all items are 0% tax', () => {
    const testData = [
      {
        rowCostPriceBeforeTax: 100,
        taxRate: 0,
      },
      {
        rowCostPriceBeforeTax: 200,
        taxRate: 0,
      },
      {
        rowCostPriceBeforeTax: 300,
        taxRate: 0,
      },
    ] as TOrderForm['selectedItems'];

    expect(summarizeItems(testData)).toEqual({
      groupedByTaxArray: [],
      totalTaxAmount: 0,
      nonTaxableAmount: 600,
      totalAmount: 600,
    });
  });

});