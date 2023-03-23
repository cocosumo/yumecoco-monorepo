export function isFullWidth(str: string) {
  const fullWidthChars = /[\uFF01-\uFF5E]/g;
  return fullWidthChars.test(str);
}