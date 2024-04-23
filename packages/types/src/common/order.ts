/* 発注関連 */

export const orderProgress = [
  '未発注',
  '発注済',
] as const;

export const invoiceProgress = [
  '請求済',
  '請求確認済',
  '請求承認済',
  '支払済',
] as const;



export type KOrderProgress = typeof orderProgress[number];
export type KInvoiceProgress = typeof invoiceProgress[number];

export type KProgress = KOrderProgress | KInvoiceProgress;


