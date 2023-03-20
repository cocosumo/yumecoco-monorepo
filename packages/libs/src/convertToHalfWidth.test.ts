import { convertToHalfWidth } from './convertToHalfWidth';

describe('convertToHalfWidth', () => {
  it('半角に変換します', () => {
    expect(convertToHalfWidth('１２３')).toBe('123');
    expect(convertToHalfWidth('１２３５２５２２３')).toBe('123525223');
  });
});