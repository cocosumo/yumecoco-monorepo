
import { Button, TableCell, TableRow } from '@mui/material';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { materialsLabelList } from '../constantDefinition';
import { TypeOfForm } from '../form';
import InputCellContent from './InputCellContent';

export const RowContent = ({ taxRate, row, rowIdx, removeRow }: {
  taxRate: number,
  row: TypeOfForm['items'][number],
  rowIdx: number,
  removeRow: (rowIdx: number) => void
}) => {
  const { setFieldValue } = useFormikContext<TypeOfForm>();
  const { costPrice, quantity, elemProfRate, unitPrice, tax } = row;

  // 各行の単価・金額の算出処理
  useEffect(() => {
    // 単価の算出処理 : IF(原価 <= 0, 0 , 原価  * ( 1 + (内訳利益率/100)))
    const newUnitPrice = +(costPrice) <= 0 ? 0
      : +(costPrice) * (1 + (elemProfRate) / 100);
    setFieldValue(`items[${rowIdx}].unitPrice`, newUnitPrice);

    // 金額の算出処理 : IF(原価 <= 0, 原価, IF ( 税="課税", (単価*数量) * (1 + (税率/100)), (単価*数量)))
    const tentative = +unitPrice * +quantity;

    const newPrice = +(costPrice) <= 0 ? costPrice
      : (tax === '課税') ?
        tentative * (1 + +(taxRate) / 100) : tentative;
    setFieldValue(`items[${rowIdx}].price`, newPrice);

  }, [costPrice, quantity, elemProfRate, unitPrice, tax]);

  return (<TableRow key={rowIdx}>
    {Object.keys(row).map((rowitem, itemIdx) => {
      return (
        <TableCell
          key={`${rowitem}_header`}
          sx={{
            padding: 1,
            verticalAlign: 'top',
          }}
        >
          <InputCellContent name={`items[${rowIdx}][${Object.keys(materialsLabelList)[itemIdx]}]`} />
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