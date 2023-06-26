import { describe, it, expect } from '@jest/globals';
import { convertObjNumValsToFullWidth } from './convertObjNumValsToFullWidth';




describe('convertObjNumValsToFullWidth', () => {
  it('数値の値が全角に変換されたオブジェクトを返す', () => {
    const obj = {
      a: 1,
      b: '文字列',
      c: 3.14,
      d: null,
    };
    const expected = {
      a: '１',
      b: '文字列',
      c: '３．１４',
      d: null,
    };
    expect(convertObjNumValsToFullWidth(obj)).toEqual(expected);
  });

  it('オブジェクトが空の場合、空のオブジェクトを返す', () => {
    const obj = {};
    const expected = {};
    expect(convertObjNumValsToFullWidth(obj)).toEqual(expected);
  });

  it('オブジェクトに数値の値が含まれていない場合、元のオブジェクトを返す', () => {
    const obj = {
      a: '文字列',
      b: [1, 2, 3],
      c: { x: 1, y: 2 },
    };
    const expected = {
      a: '文字列',
      b: [1, 2, 3],
      c: { x: 1, y: 2 },
    };
    expect(convertObjNumValsToFullWidth(obj)).toEqual(expected);
  });
});