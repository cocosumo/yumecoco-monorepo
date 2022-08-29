
import { Button, TableCell, TableRow } from '@mui/material';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { taxPulldownOpt, unitPulldownOpt } from '../constantDefinition';
import { Display } from '../fieldComponents/Display';
import { FormikInput } from '../fieldComponents/FormikInput';
import { FormikPulldown } from '../fieldComponents/FormikPulldown';
import { TypeOfForm } from '../form';

export const RowContent = ({ taxRate, row, rowIdx, removeRow }: {
  taxRate: number,
  row: TypeOfForm['items'][number],
  rowIdx: number,
  removeRow: (rowIdx: number) => void
}) => {
  const { setFieldValue } = useFormikContext<TypeOfForm>();
  const { costPrice, quantity, elemProfRate, tax } = row;

  // 各行の単価・金額の算出処理
  useEffect(() => {
    // 単価の算出処理 : IF(原価 <= 0, 0 , 原価  * ( 1 + (内訳利益率/100)))
    let newUnitPrice = 0; // 入力値がエラー(数値でない)時は0にする
    if (!(isNaN(costPrice) || isNaN(elemProfRate)) && ((costPrice) > 0)) {
      newUnitPrice = Math.round(+costPrice * (1 + (+elemProfRate / 100)));
    }
    setFieldValue(`items[${rowIdx}].unitPrice`, newUnitPrice);

    // 金額の算出処理 : IF(原価 <= 0, 原価, IF ( 税="課税", (単価*数量) * (1 + (税率/100)), (単価*数量)))
    let newPrice = 0; // 入力値がエラー(数値でない)時は0にする
    if (+costPrice <= 0) {
      newPrice = costPrice;
    } else if ((newUnitPrice !== 0) && !(isNaN(quantity))) {
      if (tax === '課税') {
        newPrice = Math.round((newUnitPrice * +quantity) * (1 + (+taxRate / 100)));
      } else { /* 非課税 */
        newPrice = Math.round(newUnitPrice * +quantity);
      }
    }
    setFieldValue(`items[${rowIdx}].price`, newPrice);

  }, [costPrice, quantity, elemProfRate, tax, taxRate]);

  return (
    <TableRow >

      {/* 大項目 */}
      <TableCell key={'majorItem_header'} sx={{ padding: 1, verticalAlign: 'top' }}>
        <FormikPulldown name={`items[${rowIdx}][majorItem]`} options={taxPulldownOpt} />
      </TableCell>

      {/* 中項目 */}
      <TableCell key={'middleItem_header'} sx={{ padding: 1, verticalAlign: 'top' }}>
        <FormikPulldown name={`items[${rowIdx}][middleItem]`} options={taxPulldownOpt} />
      </TableCell>

      {/* 部材 */}
      <TableCell key={'element_header'} sx={{ padding: 1, verticalAlign: 'top' }}>
        <FormikPulldown name={`items[${rowIdx}][element]`} options={taxPulldownOpt} />
      </TableCell>

      {/* 原価 */}
      <TableCell key={'costPrice_header'} sx={{ padding: 1, verticalAlign: 'top' }}>
        <FormikInput name={`items[${rowIdx}][costPrice]`} />
      </TableCell>

      {/* 数量 */}
      <TableCell key={'quantity_header'} sx={{ padding: 1, verticalAlign: 'top' }}>
        <FormikInput name={`items[${rowIdx}][quantity]`} />
      </TableCell>

      {/* 単位 */}
      <TableCell key={'unit_header'} sx={{ padding: 1, verticalAlign: 'top' }}>
        <FormikPulldown name={`items[${rowIdx}][unit]`} options={unitPulldownOpt} />
      </TableCell>

      {/* 利益率(部材) */}
      <TableCell key={'elemProfRate_header'} sx={{ padding: 1, verticalAlign: 'top' }}>
        <FormikInput name={`items[${rowIdx}][elemProfRate]`} />
      </TableCell>

      {/* 税(課税/非課税) */}
      <TableCell key={'tax_header'} sx={{ padding: 1, verticalAlign: 'top' }}>
        <FormikPulldown name={`items[${rowIdx}][tax]`} options={taxPulldownOpt} />
      </TableCell>

      {/* 単価 */}
      <TableCell key={'unitPrice_header'} sx={{ padding: 1, verticalAlign: 'top' }}>
        <Display name={`items[${rowIdx}][unitPrice]`} suffix={'円'} />
      </TableCell>

      {/* 金額 */}
      <TableCell key={'price_header'} sx={{ padding: 1, verticalAlign: 'top' }}>
        <Display name={`items[${rowIdx}][price]`} suffix={'円'} />
      </TableCell>

      {/* 行削除ボタン */}
      <TableCell key={`${row}_delBtn`}>
        <Button
          variant="outlined"
          onClick={() => removeRow(rowIdx)}
        >
          -
        </Button>
      </TableCell>

    </TableRow>
  );
};