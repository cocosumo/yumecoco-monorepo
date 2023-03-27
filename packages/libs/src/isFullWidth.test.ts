import { isFullWidth } from './isFullWidth';

describe('isFullWidth関数', () => {
  test('全角文字が含まれる場合、trueを返すこと', () => {
    const str = 'こんにちは、世界！１２３';
    expect(isFullWidth(str)).toBe(true);
  });

  test('半角文字のみの場合、falseを返すこと', () => {
    const str = 'Hello, world! 123';
    expect(isFullWidth(str)).toBe(false);
  });

  test('空文字列の場合、falseを返すこと', () => {
    const str = '';
    expect(isFullWidth(str)).toBe(false);
  });
});