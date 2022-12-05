
import { v4 as uuidv4 } from 'uuid';
import { TaxType } from 'types';

export const unitChoices = [
  '', '式', '㎡(平米)', '㎥(立米)', 'm(メートル)', 'ヶ所', '個', 'セット', '本', '枚',
  'ケース', '台', '組', '袋', '箱', 'kg', 't',
] as const;
export const statusChoices = [
  '', '契約', '銀行用', '工事実行', '追加', '追加減額',
] as const;

export type TMaterials = TypeOfForm['items'][0];
export type TKMaterials = keyof TMaterials;

export const initialValues = {
  /** 「一時保存」か「保存」 */
  saveMode: 'normal' as  'temporary' | 'normal',
  estimateId: '',
  estimateDataId: '',
  projId: '',
  custGroupId: '',
  projName: '',
  customerName: '',
  createdDate: '',
  envStatus: '',

  projDataId: '',

  /** 工事種別 */
  projTypeName: '',
  projTypeId: '',
  projTypeProfit: 50, /* 利益率 */

  /** 工事種別に対して最新の利益設定 */
  projTypeProfitLatest: null as null | number,

  /** 税 */
  tax: 10,

  /** ステータス */
  status: '' as typeof statusChoices[number],

  /* 見積もり用配列要素 */
  items: [
    {
      key: uuidv4(),

      /** 大項目 */
      majorItem: '',

      /** 中項目 */
      middleItem: '',

      /** 部材 */
      element: '',

      /** 原価 */
      costPrice: 0,

      /** 数量 */
      quantity: 1,

      /** 利益(%) */
      elemProfRate: 0,

      /** 単価 */
      unitPrice: 0,


      /** 行の税抜き単価合計・金額 */
      rowUnitPriceAfterTax: 0,

      /** 単位 */
      unit: '式' as typeof unitChoices[number],

      /** 税(課税/非課税) */
      taxType: '課税' as TaxType,  /* 税(課税/非課税) */
    },
  ],
};

export type TypeOfForm = typeof initialValues;
export type KeyOfForm = keyof TypeOfForm;

/*
 フィールド名取得、ヘルパー
 */

export const getFieldName = (s: KeyOfForm) => s;

const itemsName = getFieldName('items');
export const getItemFieldName = (
  rowIdx: number, fieldName: TKMaterials,
) => `${itemsName}[${rowIdx}].${fieldName}`;

