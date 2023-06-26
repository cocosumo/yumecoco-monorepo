import { isMixedJpWidth } from './isMixedJpWidth';
import { expect, describe, test } from '@jest/globals';

describe('isMixedWidth', () => {
  test('全角文字と半角文字が混在している場合、trueを返す', () => {
    const result = isMixedJpWidth('1000１０００');
    expect(result).toBe(true);
  });

  test('全角文字のみの場合、falseを返す', () => {
    const result = isMixedJpWidth('１００００');
    expect(result).toBe(false);
  });

  test('半角文字のみの場合、falseを返す', () => {
    const result = isMixedJpWidth('1000');
    expect(result).toBe(false);
  });

  test('空文字列の場合、falseを返す', () => {
    const result = isMixedJpWidth('');
    expect(result).toBe(false);
  });
});