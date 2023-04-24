import { yupJA, yupValidations } from 'kokoas-client/src/helpers/yupLocaleJA';

const {
  yupNumber,
} = yupValidations;

export type TStatusChoices = '' | '契約' | '銀行用' | '工事実行' | '追加' | '追加減額';

export const statusChoices: TStatusChoices[] = [ '', '契約', '銀行用', '工事実行', '追加', '追加減額'];

export const unitChoices = [
  '式', '㎡(平米)', '㎥(立米)', 'm(メートル)', 'ヶ所', '個', 'セット', '本', '枚',
  'ケース', '台', '組', '袋', '箱', 'kg', 't', '車',
];

export type TunitChoices = typeof unitChoices[number] ;



export const validationSchema = yupJA
  .object({
    createdDate: yupJA.date().nullable(),
    custGroupId: yupJA.string(),
    customerName :  yupJA.string(),

    estimateId: yupJA.string(),
    estimateDataId: yupJA.string(),
    estimateRevision: yupJA.string(),

    projDataId: yupJA.string().required(),
    projId: yupJA.string().required(),
    projName: yupJA.string().required(),

    projTypeId: yupJA.string().required(),
    projTypeName : yupJA.string().required(),
    projTypeProfitLatest: yupNumber.max(100),
    projTypeProfit: yupNumber.max(100).required(),

    taxRate: yupNumber.required(),
    status: yupJA.mixed<TStatusChoices>().oneOf(statusChoices),

    envStatus: yupJA.string(),

    /* 合計欄 */
    totalCostPrice: yupNumber.required(),
    totalAmountAfterTax: yupNumber.required(),
    totalAmountBeforeTax: yupNumber.required(),

    'items': yupJA.array()
      .of(
        yupJA.object({
          majorItem: yupJA.string().nullable(), // 大項目
          middleItem: yupJA.string().nullable(), // 中項目
          material: yupJA.string().nullable(),  // 部材
          costPrice: yupNumber.required(), // 原価
          quantity: yupNumber.required(), // 数量
          rowCostPrice: yupNumber.required(),
          materialProfRate: yupNumber.required()
            .max(100, '100以下の数字を入力してください'), // 利益率(部材)
          unit: yupJA.string().required(), // 単位
          taxable: yupJA.boolean().required(),  // 税(課税/非課税)
          unitPrice: yupNumber.required(), // 単価
          materialDetails: yupJA.string(),
          rowDetails: yupJA.string(),
          rowUnitPriceBeforeTax: yupNumber.required(), // 税抜き金額 */
          rowUnitPriceAfterTax: yupNumber.required(), // 税込み金額
        }),
      )
      .required('Must have items')
      .min(1, 'Minimum of 1 items'),

    remarks: yupJA.string().nullable(),


  });