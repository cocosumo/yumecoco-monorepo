import { convertObjNumValsToHalfWidth } from './convertObjNumValsToHalfWidth';
import { expect, describe, it } from '@jest/globals';

describe('convertObjectNumbersToHalfWidth', () => {
  it('オブジェクトの全角数値を半角に変換します', () => {
    const testInput = {
      costPrice: '１２３',
      unitPrice: '１２３５２５２２３',
      rowUnitPriceBeforeTax: '56565656',
    };
    const testOutput = {
      costPrice: '123',
      unitPrice: '123525223',
      rowUnitPriceBeforeTax: '56565656',
    };

    expect(convertObjNumValsToHalfWidth(testInput)).toEqual(testOutput);
  });

});