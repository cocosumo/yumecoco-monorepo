
import { Button, TableCell, TableRow } from '@mui/material';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { materialsLabelList } from '../constantDefinition';
import { TypeOfForm } from '../form';
import InputCellContent from './InputCellContent';

export const RowContent = ({ row, rowIdx, removeRow }: {
  row: TypeOfForm['items'][number],
  rowIdx: number,
  removeRow: (rowIdx: number) => void
}) => {
  const { setFieldValue } = useFormikContext<TypeOfForm>();

  // console.log('rowContent chk', row);
  const { costPrice, quantity, elemProfRate } = row;


  useEffect(() => {

    
    // 単価 = IF(原価 <= 0, 0 , 原価  * ( 1 + (内訳利益率/100)))
    const newUnitPrice = +(costPrice) <= 0 ? 0
      : +(costPrice) * (1 + (elemProfRate) / 100) ;
    // console.log('発火チェック', newUnitPrice);
    setFieldValue(`items[${rowIdx}].unitPrice`, newUnitPrice);

  }, [costPrice, quantity, elemProfRate]);

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