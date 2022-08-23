import { useFormikContext } from 'formik';
import { TypeOfForm } from '../form';

/**
 * 表示用コンテンツの値の更新処理
 * @returns 最新の表示値
 */
export default function quoteCalcProcessDisplay(target: string, field) {
  const { values } = useFormikContext<TypeOfForm>();
  const idx = field.name.split('[')[1].replace(']', '');
  let sum = 0;

  if (target === 'unitPrice') {
    // 単価 = IF(原価 <= 0, 0 , 原価  * ( 1 + (内訳利益率/100)))
    sum = Number(values.items[idx].costPrice) <= 0 ? 0
      : Number(values.items[idx].costPrice) * (1 + (values.items[idx].elemProfRate) / 100) ;
  } else if (target === 'price') {
    /* 金額 = IF(原価 <= 0, 原価, IF ( 税="課税", (単価*数量) * (1 + (税率/100)), (単価*数量))) */
    const tentative = (Number(values.items[idx].unitPrice) * Number(values.items[idx].quantity));

    sum = Number(values.items[idx].costPrice) <= 0 ? values.items[idx].costPrice
      : (values.items[idx].tax = '課税') ?
        tentative * (1 + (values.taxRate) / 100) : tentative;
  } else {
    sum = field.value;
  }

  return sum;
}
