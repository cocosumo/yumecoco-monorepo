import { calcProfitRate } from 'api-kintone';

describe('calcProfitRate', () => {
  it('should calculate profit rate', () => {
    const result = calcProfitRate(100, 200);

    console.log(result);
    expect(result).toBe(0.5);
  });

});