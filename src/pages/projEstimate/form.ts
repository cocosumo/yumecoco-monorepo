
import * as Yup from 'yup';

/**
 * 見積もりアイテムの型定義
 */
export type TMaterials = {
  number: number,
  majorItem: string,
  middleItem: string,
  element: string,
  costPrice: string,
  quantity: string,
  elemProfRate: number,
  unit: string,
  tax: string,
  unitPrice: number,
  price: number,
};
export const materialsLabelList = [
  'number', 'majorItem', 'middleItem', 'element', 'costPrice',
  'quantity', 'elemProfRate', 'unit', 'tax', 'unitPrice', 'price',
];

export type TFullMaterials = {
  items: Array<TMaterials>,
};

/**
 * 見積もりアイテムのラベル定義
 */
export const materialsNameList = [
  'No.', '大項目*', '中項目', '部材', '原価*', '数量*', '利益率', '単位', '税(課税 / 非課税)', '単価', '金額',
];

export const initialValues = {
  projId: '',
  costomerName: '',
  constructionType: '', /* 工事種別(ルックアップ) */
  profitRate: 0.5, /* 利益率(自動計算) */
  taxRate: 10, /* 税率 */

  /* 見積もり用配列要素 */
  items: [
    {
      number: 0,
      majorItem: '',  /* 大項目 */
      middleItem: '', /* 中項目 */
      element: '',    /* 部材 */
      costPrice: '',  /* 原価 */
      quantity: '',   /* 数量 */
      elemProfRate: 0, /* 利益率(部材) */
      unit: '', /* 単位 */
      tax: '',  /* 税(課税/非課税) */
      unitPrice: 0, /* 単価(原価*利益率(部材)) */
      price: 0, /* 金額(課税：(単価*数量) * (1 + (税率/100)), 非課税：(単価*数量)) */
    },
  ] as TMaterials[],

  /* 合計 */
  totalCost: 0, /* 原価合計 */
  grossProfit: 0, /* 粗利 */
  grossProfitMargin: 0, /* 粗利率 */
  taxAmount: 0, /* 税(円) */
  taxExcludedAmount: 0, /* 税抜金額 */
  amountIncludingTax: 0, /* 税込金額 */
  /* 大項目ごとの小計 */
  majorItemName: '', /* 大項目 */
  itemSubtotal: 0, /* 大項目小計 */
};

export type TypeOfForm = typeof initialValues;
export type KeyOfForm = keyof TypeOfForm;

export const getFieldName = (s: KeyOfForm) => s;

export const validationSchema = Yup.object(
  {
    'projId': Yup
      .string()
      .required('必須です。'),
    'profitRate': Yup
      .number(),
    'taxRate': Yup
      .number()
      .required('必須です。'),
    'items': Yup.array()
      .of(
        Yup.object().shape({
          'number': Yup.number(),
          'majorItem': Yup.string().required('必須です。'),
          'middleItem': Yup.string(), /* 中項目 */
          'element': Yup.string(),    /* 部材 */
          'costPrice': Yup.string().required('必須です。'), /* 原価 */
          'quantity': Yup.string().required('必須です。'), /* 数量 */
          'elemProfRate': Yup.number(), /* 利益率(部材) */
          'unit': Yup.string(), /* 単位 */
          'tax': Yup.string(),  /* 税(課税/非課税) */
          'unitPrice': Yup.number(), /* 単価(原価*利益率(部材)) */
          'price': Yup.number(), /* 金額(課税：(単価*数量) * (1 + (税率/100)), 非課税：(単価*数量)) */
        }),
      )
      .required('Must have items')
      .min(1, 'Minimum of 1 items'),
  } as Partial<Record<KeyOfForm, any>>,
);