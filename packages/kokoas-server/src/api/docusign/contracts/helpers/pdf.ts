import { splitText } from 'libs';
import { PDFPage, PDFPageDrawTextOptions, rgb } from 'pdf-lib';


type AdvancedOptions = {
  weight?: number, // 太さ デフォールト 0.4
  boxWidth?: number, // フィールドの後ろのXから頭のＸを引いた数字。
  align?: 'left' | 'right' | 'center', // 水平方向への配置, boxWidthに依存している
  isShowBox?: boolean // trueにすると、赤い箱が表示されます。デバグの時、役に立つ
  isAutoSize?: boolean // trueにすると、boxWidthに依存している
  maxLength?: number // 文字の最大長さ
};

/**
 * Wrapper function to implement font-weight (bold)
 * and other text rendering functionalities.
 *
 * Update this, once pdf-lib officially support them.
 * https://github.com/Hopding/pdf-lib/discussions/998
 *
 * Author: Ras
 *
 * @param pdfPage
 * @param text
 * @param contentType
 * @param advancedOptions
 */
export const drawText = async (
  pdfPage: PDFPage,
  text: string,
  {
    x,
    y,
    color = rgb(0, 0, 0),
    size = 10,
    font,
    ...otherOptions
  } : PDFPageDrawTextOptions,
  advancedOptions?: AdvancedOptions,
) => {

  const {
    weight = 0.4,
    align = 'left',
    boxWidth = 102,
    isShowBox = false,
    isAutoSize = false,
    maxLength = 70,
  } = advancedOptions || {};

  const defaultText = text ?? '';
  let parsedFontSize = size;

  const hasMultilineText = defaultText.includes('\n'); // check if passed text has "\n"
  const parsedTextArray = hasMultilineText // if passed text has multiline,
    ? [defaultText] // don't split
    : splitText(defaultText, maxLength); // else, split by maxTextLength

  const parsedText = parsedTextArray.join('\n');
  const textLines = parsedTextArray.length;
  const isMultiLine = textLines > 1 || hasMultilineText;



  
  const textWidth = font?.widthOfTextAtSize(parsedTextArray[0] ?? '', size) ?? 0;

  if (boxWidth && font && isAutoSize) {
    while (
      font?.widthOfTextAtSize(
        hasMultilineText 
          ? defaultText.split('\n')[1] // for now, only check 2nd line, currently for 工事場所. Improve this to be more flexible. ras 2023-06-17 
          : parsedTextArray[0] ?? '', 
        parsedFontSize,
      ) > boxWidth
    ) {
      parsedFontSize -= 0.1;
    }
  }

  const renderLines = defaultText.includes('\n') 
    ? 1 // if passed text has \n fix offset by 1 lineheight
    : textLines - 1; // if split due to maxTextLength, adjust offset by number of lines

  const boxX = x ?? 0;
  const boxY = (y ?? 0) + (isMultiLine 
    ? ((renderLines) * (parsedFontSize * 0.8)) 
    : 0); // If multiline, add offset to Y

  if (isShowBox) {
    pdfPage.drawRectangle({
      x: boxX,
      y: boxY,
      width: boxWidth,
      height: 50,
      borderColor: rgb(1, 0, 0),
    });
  }

  const parsedWeight = isMultiLine ? 0.1 : weight;


  for (let i = 0.1; i <= parsedWeight; i += 0.1) {
    if (isMultiLine) {
      console.log('multiline', parsedTextArray ?? '', parsedFontSize);
    }

    switch (align) {
      case 'left':
        pdfPage.drawText(parsedText, {
          x: (x || 0) + i,
          y: boxY,
          size: parsedFontSize, // 影響は十分にテスト出来ないため、一応、ここのみサイズを変える
          font: font,
          color: color,
          lineHeight: parsedFontSize,
          ...otherOptions,
        });
        break;
      case 'right':
        pdfPage.drawText(parsedText, {
          x: boxX + boxWidth - textWidth + i,
          y: boxY,
          font,
          size: parsedFontSize,
          ...otherOptions,
        });
        break;
      case 'center':
        pdfPage.drawText(parsedText, {
          x: (boxX + (boxWidth / 2 )) - (textWidth / 2) + i,
          y: boxY,
          font,
          size: parsedFontSize,
          ...otherOptions,
        });
        break;
    }
  }
};
