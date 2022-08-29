
import { Button, TableCell, TableRow } from '@mui/material';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { TKMaterials, TypeOfForm } from '../form';
import InputCellContent from './InputCellContent';

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
    if (+costPrice <= 0 ) {
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

  return (<TableRow >
    {(Object.keys(row) as TKMaterials[]).map((rowitem) => {
      return (
        <TableCell
          key={`${rowitem}_header`}
          sx={{
            padding: 1,
            verticalAlign: 'top',
          }}
        >
          <InputCellContent fieldName={rowitem} rowIdx={rowIdx} />
        </TableCell>
      );
    })}
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