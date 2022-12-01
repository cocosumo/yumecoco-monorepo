// カタカナ→ひらがな
export const replaceKanaToHira = (str: string) => {
  return str.replace(/[\u30a1-\u30f6]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0x60);
  });
};