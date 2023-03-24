import { convertToHalfWidth } from './convertToHalfWidth';

describe('convertToHalfWidth', () => {
  it('文字列でない入力はそのまま返す', () => {
    expect(convertToHalfWidth(42)).toBe(42);
    expect(convertToHalfWidth(null)).toBe(null);
    expect(convertToHalfWidth(undefined)).toBe(undefined);
  });

  it('全角数字を半角数字に変換する', () => {
    expect(convertToHalfWidth('１２３４５６７８９０')).toBe('1234567890');
  });

  it('マイナス記号を半角ハイフンに変換する', () => {
    expect(convertToHalfWidth('－１２３４５６７８９０')).toBe('-1234567890');
    expect(convertToHalfWidth('−１２３４５６７８９０')).toBe('-1234567890');
    expect(convertToHalfWidth('―１２３４５６７８９０')).toBe('-1234567890');
    expect(convertToHalfWidth('ー１２３４５６７８９０')).toBe('-1234567890');
  });

  it('小数点を半角ピリオドに変換する', () => {
    expect(convertToHalfWidth('１２３４５．６７８９０')).toBe('12345.67890');
    expect(convertToHalfWidth('１２３４５。６７８９０')).toBe('12345.67890');
  });

  it('全角数字とマイナス記号、小数点を組み合わせて変換する', () => {
    expect(convertToHalfWidth('－１２３４５．６７８９０')).toBe('-12345.67890');
    expect(convertToHalfWidth('１２３４５．６７８９００−７．８９')).toBe('12345.678900-7.89');
    expect(convertToHalfWidth('ー１．２３４')).toBe('-1.234');
  });
});
