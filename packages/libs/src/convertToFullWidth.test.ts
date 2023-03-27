import { convertToFullWidth } from './convertToFullWidth';

/**
 * convertToFullWidth関数のJestテスト
 */
describe('convertToFullWidth', () => {
  test('整数を全角に変換できる', () => {
    expect(convertToFullWidth(12345)).toBe('１２３４５');
  });

  test('小数を全角に変換できる', () => {
    expect(convertToFullWidth(1234.56)).toBe('１２３４．５６');
  });

  test('0を全角に変換できる', () => {
    expect(convertToFullWidth(0)).toBe('０');
  });

  test('負の数を全角に変換できる', () => {
    expect(convertToFullWidth(-123.45)).toBe('－１２３．４５');
  });

  test('文字列を全角に変換できる', () => {
    expect(convertToFullWidth('789')).toBe('７８９');
  });

  test('数値以外の値を渡すとNaNを返す', () => {
    expect(convertToFullWidth('abc')).toBe('NaN');
  });
});