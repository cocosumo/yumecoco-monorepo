import { calculateEstimateRow } from './calculateEstimateRow';

describe('calculateEstimateRow', () => {

  
  // ※ etc : 全ケースに「原価」と「数量」は必須なので、テストのラベルから省略
  // Test with specific input to determine edge cases.

  // 「税込み単価合計」が編集された場合
  it('Given: 「税込み単価合計」etc,  calculate:「税抜き合計」&「単価」&「粗利」& 「利益率」', () => {

    const testData: Parameters<typeof calculateEstimateRow>[0] = {
      costPrice: 1000,
      isTaxable: true,
      quantity: 1,
      taxRate: 0.1,
      rowUnitPriceAfterTax: 2200, // 「税込み単価合計」
    };

    expect(testData.profitRate).toBeUndefined();
    expect(testData.unitPrice).toBeUndefined();

    const results = calculateEstimateRow(testData);

    const {
      unitPrice,
      rowUnitPriceAfterTax,
      rowProfit,
      profitRate,
    } = results;

    console.log(results);

    expect(rowProfit).toEqual(1000);
    expect(rowUnitPriceAfterTax).toEqual(2200);
    expect(unitPrice).toEqual(2000);
    expect(profitRate).toEqual(0.5);

  });


  // 「単価」が編集された場合
  it('Given: 「単価」etc,  calculate:「税込み単価合計」&「税抜き単価合計」&「粗利」& 「利益率」', () => {

    const testData: Parameters<typeof calculateEstimateRow>[0] = {
      costPrice: 1000,
      isTaxable: true,
      quantity: 2,
      taxRate: 0.1,
      unitPrice: 2000,
    };


    expect(testData.profitRate).toBeUndefined();
    expect(testData.rowUnitPriceAfterTax).toBeUndefined();

    const results = calculateEstimateRow(testData);

    const {
      unitPrice,
      rowUnitPriceAfterTax,
      rowUnitPriceBeforeTax,
      rowProfit,
    } = results;

    console.log(results);

    expect(rowProfit).toEqual(2000);
    expect(rowUnitPriceAfterTax).toEqual(4400);
    expect(rowUnitPriceBeforeTax).toEqual(4000);
    expect(unitPrice).toEqual(2000);

  });


  // 「税込み単価合計」と「単価」以外編集された場合、
  
  it('Given: 「利益率」etc,  calculate:「税込み単価合計」&「単価」&「粗利」', () => {
    const testData: Parameters<typeof calculateEstimateRow>[0] = {
      costPrice: 1000,
      profitRate: 0.5, // 「利益率」
      isTaxable: true,
      quantity: 1,
      taxRate: 0.1,
    };


    expect(testData.rowUnitPriceAfterTax).toBeUndefined();
    expect(testData.unitPrice).toBeUndefined();

    const results = calculateEstimateRow(testData);

    const {
      unitPrice,
      rowUnitPriceAfterTax,
      rowProfit,
    } = results;

    console.log(results);


    expect(unitPrice).toEqual(2000);
    expect(rowProfit).toEqual(1000);
    expect(rowUnitPriceAfterTax).toEqual(2200); 

  });

  // Edge cases (稀で通常以外のケース)

  // TODO
});