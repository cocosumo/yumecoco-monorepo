import { countCharacters } from './countCharacters';


/** 文字長を確認して、フォントサイズを返す */
export const chkStrLength = ({
  text,
  maxlen,
  fontSize,
}: {
  text: string,
  maxlen: number,
  fontSize: number,
}) => {
  const textLen = countCharacters(text);

  if (textLen > maxlen) {
    return Math.floor(fontSize * (maxlen / textLen));
  }

  return fontSize;

};
