
/**
 * 見積もりテーブルの初期値
 */
export const buzaiListInit = {
  number: 0,
  majorItem: '',
  middleItem: '',
  element: '',
  costPrice: 0,
  quantity: 1,
  elemProfRate: 0,
  unit: '式',
  tax: '課税',
  unitPrice: 0,
  price: 0,
};

/**
 * 見積もりアイテムのラベル定義
 */
export const materialsNameList = [
  '大項目*', '中項目', '部材', '原価*', '数量*', '単位', '利益率(%)', '税(課税 / 非課税)', '単価', '金額',
] as const;

/**
 * 合計欄のラベル定義
 */
export const summaryNameList = [
  '原価合計', '粗利', '粗利率', '税(円)', '税抜金額', '税込金額',
] as const;

/**
 * 部材毎の税(課税/非課税)のプルダウンオプション
 */
export const taxPulldownOpt: Options = [
  { label: '課税', value: '課税' },
  { label: '非課税', value: '非課税' },
];

/**
 * 部材毎の単位のプルダウンオプション
 */
export const unitPulldownOpt: Options = [
  { label: '式', value: '式' },
  { label: '㎡(平米)', value: '㎡(平米)' },
  { label: '㎥(立米)', value: '㎥(立米)' },
  { label: 'm(メートル)', value: 'm(メートル)' },
  { label: 'ヶ所', value: 'ヶ所' },
  { label: '個', value: '個' },
  { label: 'セット', value: 'セット' },
  { label: '本', value: '本' },
  { label: '枚', value: '枚' },
  { label: 'ケース', value: 'ケース' },
  { label: '台', value: '台' },
  { label: '組', value: '組' },
  { label: '袋', value: '袋' },
  { label: '箱', value: '箱' },
  { label: 'kg', value: 'kg' },
  { label: 't', value: 't' },
];