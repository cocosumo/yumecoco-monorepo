

/** pdf内での比較のため、文字数での確認とする */
export const countCharacters = (str: string) => {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    // 全角文字かどうかを判定し、文字数を加算する
    if ((charCode >= 0x0 && charCode < 0x81)
      || (charCode === 0xf8f0)
      || (charCode >= 0xff61 && charCode < 0xffa0)
      || (charCode >= 0xf8f1 && charCode < 0xf8f4)) {
      count += 1;
    } else {
      count += 2;
    }
  }
  return count;
};
