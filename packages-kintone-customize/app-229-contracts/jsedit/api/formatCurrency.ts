/**
 * 数字の頭に￥マークと、3桁ごとにカンマを挿入する
**/

export function formatCurrency(amount: number | string) {

  const parsedAmount = typeof amount === 'string' ? parseInt(amount) : amount;
  
  // 3桁ごとにカンマを挿入するフォーマットに変換
  const formattedAmount = parsedAmount.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' });
  return formattedAmount;

}