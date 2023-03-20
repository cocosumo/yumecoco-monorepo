
// 全角数字を半角数字に変換
export function convertToHalfWidth(input: string) {
  // Replace all full-width characters with their corresponding half-width characters
  let output = '';
  for (let i = 0; i < input.length; i++) {
    const code = input.charCodeAt(i);
    if (code >= 65281 && code <= 65374) {
      output += String.fromCharCode(code - 65248);
    } else {
      output += input.charAt(i);
    }
  }
  return output;
}