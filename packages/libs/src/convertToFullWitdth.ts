export function convertToFullWitdth(num: number | string) {
  const digits = String(num).split('');
  const fullWidthDigits = digits.map(d => String.fromCharCode(0xff10 + parseInt(d)));
  return fullWidthDigits.join('');
}