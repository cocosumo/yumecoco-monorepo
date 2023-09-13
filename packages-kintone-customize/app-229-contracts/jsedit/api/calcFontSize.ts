import { getTextWidth } from '../../src/helpers/getTextWidth';

export const calcFontSize = (
  width: number,
  text: string,
) => {
  let fontSize = 16;

  while (getTextWidth(text, fontSize) > width) {
    fontSize -= 0.5;
  }

  return fontSize;
};