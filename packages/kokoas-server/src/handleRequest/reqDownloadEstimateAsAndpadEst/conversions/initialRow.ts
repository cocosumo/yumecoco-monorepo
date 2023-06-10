
// Andpad側で必須になっているので、山豊工建の取引先IDにs固定
const transactionPartnerId = 207075;

export const initialRow = {
  工事場所: '',

  工事種類: '',

  /** 部材名 */
  摘要: '',
  備考１: '',
  備考２: '',
  定価: 0,
  原単価: 0,
  数量: 0,
  単位: '',
  取引先ID: transactionPartnerId,
  取引先管理ID: '',
  取引先名: '',
  メモ: '',
  金額反映なし: 'あり',
  PDF非表示: '表示',
  商品マスター管理ID: '',

};