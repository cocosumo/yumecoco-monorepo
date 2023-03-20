import { convertToFullWitdth } from './convertToFullWitdth';

describe('convertToFullWitdth', () => {
  it('全角に変換します', () => {
    expect(convertToFullWitdth(123)).toBe('１２３');
    expect(convertToFullWitdth('123')).toBe('１２３');
  });
});