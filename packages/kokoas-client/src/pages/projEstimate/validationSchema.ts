import * as Yup from 'yup';
import { KeyOfForm, TKMaterials } from './form';

const mustBeNum = Yup.number()
  .typeError('数値で入力してください');

const positiveNum =  mustBeNum
  .min(0, '0以上の数字を入力してください');

const requiredPositiveNum = positiveNum
  .required('必須です');


const requiredNum = mustBeNum.required('必須です');


/*
バリデーション
*/
export const validationSchema = Yup
  .object<Partial<Record<KeyOfForm, any>>>(
  {
    'projId': Yup
      .string()
      .required('必須です。'),
    'projTypeProfit': Yup
      .number(),
    'tax': Yup
      .number()
      .required('必須です。'),
    'items': Yup.array()
      .of(
        Yup.object().shape <Partial<Record<TKMaterials, any>>>({
          'majorItem': Yup.string(),
          'middleItem': Yup.string(), /* 中項目 */
          'material': Yup.string(),    /* 部材 */
          'costPrice': requiredNum, /* 原価 */
          'quantity': requiredNum, /* 数量 */
          'elemProfRate': requiredPositiveNum
            .max(100, '100以下の数字を入力してください'), /* 利益率(部材) */
          'unit': Yup.string(), /* 単位 */
          'taxType': Yup.string(),  /* 税(課税/非課税) */
          'unitPrice': requiredNum, /* 単価 */
          'rowUnitPriceAfterTax': requiredNum, /* 金額 */
        }),
      )
      .required('Must have items')
      .min(1, 'Minimum of 1 items'),
  },
);