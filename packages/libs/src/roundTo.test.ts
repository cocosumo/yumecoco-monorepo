

import { expect } from '@jest/globals';
import { roundTo } from './roundTo';

describe('roundTo', () => {
  it('roundHalfUp', () => {
    // 四捨五入
    expect(roundTo(0.001, 2, 1)).toEqual(0);
    expect(roundTo(0.01, 2, 1)).toEqual(0.01);
    expect(roundTo(0.555, 2, 1)).toEqual(0.56);
    expect(roundTo(0.99999999999, 2, 1)).toEqual(1);
    expect(roundTo(0.129, 2, 1)).toEqual(0.13);
    expect(roundTo(0.129, 1, 1)).toEqual(0.1);

    expect(roundTo(1.005, 2, 1)).toEqual(1.01);
    expect(roundTo(1.005, 0, 1)).toEqual(1);
    expect(roundTo(1.005, 0)).toEqual(1);

    expect(roundTo(50.99999999999, 2, 1)).toEqual(51);

    expect(roundTo(22.1212, 2, 1)).toEqual(22.12);
    expect(roundTo(22.555, 2, 1)).toEqual(22.56);

    expect(roundTo(345.555, -1, 1)).toEqual(350);
    expect(roundTo(345.555, -2, 1)).toEqual(300);

  });

  it('roundHalfEven', () => {
    // 五捨五超入

    expect(roundTo(0.001, 2, 2)).toEqual(0);
    expect(roundTo(0.01, 2, 2)).toEqual(0.01);
    expect(roundTo(0.555, 2, 2)).toEqual(0.56);
    expect(roundTo(0.99999999999, 2, 2)).toEqual(1);
    expect(roundTo(0.129, 2, 2)).toEqual(0.13);
    expect(roundTo(0.129, 1, 2)).toEqual(0.1);

    expect(roundTo(1.006, 2, 2)).toEqual(1.01);
    expect(roundTo(1.006, 0, 2)).toEqual(1);
    expect(roundTo(1.006)).toEqual(1);

    expect(roundTo(50.99999999999, 2, 2)).toEqual(51);

    expect(roundTo(22.1212, 2, 2)).toEqual(22.12);
    expect(roundTo(22.666, 2, 2)).toEqual(22.67);

    expect(roundTo(456.555, -1, 2)).toEqual(460);
    expect(roundTo(456.555, -2, 2)).toEqual(500);
  });

  it('roundDown', () => {
    // 切り捨て
    expect(roundTo(0.001, 2, 0)).toEqual(0);
    expect(roundTo(0.01, 2, 0)).toEqual(0.01);
    expect(roundTo(0.555, 2, 0)).toEqual(0.55);
    expect(roundTo(0.99999999999, 2, 0)).toEqual(0.99);
    expect(roundTo(0.129, 2, 0)).toEqual(0.12);
    expect(roundTo(0.129, 1, 0)).toEqual(0.1);

    expect(roundTo(1.066, 2, 0)).toEqual(1.06);
    expect(roundTo(1.066, 0, 0)).toEqual(1);

    expect(roundTo(50.99999999999, 2, 0)).toEqual(50.99);

    expect(roundTo(22.1212, 2, 0)).toEqual(22.12);
    expect(roundTo(22.666, 2, 0)).toEqual(22.66);
    
    expect(roundTo(456.555, -1, 0)).toEqual(450);
    expect(roundTo(456.555, -2, 0)).toEqual(400);
  });

  
  it('roundUp', () => {
    // 切り上げ
    expect(roundTo(0.001, 2, 3)).toEqual(0.01);
    expect(roundTo(0.01, 2, 3)).toEqual(0.01);
    expect(roundTo(0.555, 2, 3)).toEqual(0.56);
    expect(roundTo(0.99999999999, 2, 3)).toEqual(1);
    expect(roundTo(0.129, 2, 3)).toEqual(0.13);
    expect(roundTo(0.129, 1, 3)).toEqual(0.2);

    expect(roundTo(1.066, 2, 3)).toEqual(1.07);
    expect(roundTo(1.066, 0, 3)).toEqual(2);

    expect(roundTo(50.99999999999, 2, 3)).toEqual(51);

    expect(roundTo(22.1212, 2, 3)).toEqual(22.13);
    expect(roundTo(22.666, 2, 3)).toEqual(22.67);
    
    expect(roundTo(456.555, -1, 3)).toEqual(460);
    expect(roundTo(456.555, -2, 3)).toEqual(500);
  });
  
  it('roundHalfDown', () => {
    // 五捨六入
    expect(roundTo(1.50, 0, 4)).toEqual(1);
    expect(roundTo(1.59, 0, 4)).toEqual(1);
    expect(roundTo(1.60, 0, 4)).toEqual(2);
    expect(roundTo(0.001, 2, 4)).toEqual(0);
    expect(roundTo(0.01, 2, 4)).toEqual(0.01);
    expect(roundTo(0.555, 2, 4)).toEqual(0.55);
    expect(roundTo(0.99999999999, 2, 4)).toEqual(1);
    expect(roundTo(0.129, 2, 4)).toEqual(0.13);
    expect(roundTo(0.129, 1, 4)).toEqual(0.1);

    expect(roundTo(1.006, 2, 4)).toEqual(1.01);
    expect(roundTo(1.006, 0, 4)).toEqual(1);
    expect(roundTo(1.006)).toEqual(1);

    expect(roundTo(50.99999999999, 2, 4)).toEqual(51);

    expect(roundTo(22.1212, 2, 4)).toEqual(22.12);
    expect(roundTo(22.666, 2, 4)).toEqual(22.67);

    expect(roundTo(456.555, -1, 4)).toEqual(460);
    expect(roundTo(456.555, -2, 4)).toEqual(400);
  });

});