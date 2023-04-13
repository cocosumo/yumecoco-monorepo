import { getNumberFromString } from './getNumberFromString';

describe('getNumberFromString', () => {
  it('渡された文字列から数字を抽出することができる', () => {
    const str = 'abcd1234efg';
    const result = getNumberFromString(str);
    expect(result).toBe(1234);
  });

  it('文字列に数字が含まれていない場合、0を返す', () => {
    const str = 'abcdefghi';
    const result = getNumberFromString(str);
    expect(result).toBe(0);
  });

  it('文字列に数字と共に文字が含まれている場合、数字以外の文字を無視して数字を抽出する', () => {
    const str = 'abc12d34efg';
    const result = getNumberFromString(str);
    expect(result).toBe(1234);
  });

  it('文字列が空文字列の場合、0を返す', () => {
    const str = '';
    const result = getNumberFromString(str);
    expect(result).toBe(0);
  });

  it('小数点以下がない場合、整数として解釈される', () => {
    const str = '3.00';
    const result = getNumberFromString(str);
    expect(result).toBe(3);
  });

  it('小数点の前後に文字列が存在する場合、適切に小数を抽出できる', () => {
    const str = 'The price is $2.99';
    const result = getNumberFromString(str);
    expect(result).toBe(2.99);
  });
});
