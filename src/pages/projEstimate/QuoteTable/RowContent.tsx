
import { Button, TableCell, TableRow } from '@mui/material';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { Display } from '../fieldComponents/Display';
import { FormikInput } from '../fieldComponents/FormikInput';
import { FormikPulldown } from '../fieldComponents/FormikPulldown';
import { getFieldName, TKMaterials, TypeOfForm } from '../form';
import InputCellContent from './InputCellContent';

const itemsName = getFieldName('items');

const getItemFieldName = (
  rowIdx: number, fieldName: TKMaterials,
) => `${itemsName}[${rowIdx}].${fieldName}`;

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
    setFieldValue(getItemFieldName(rowIdx, 'unitPrice'), newUnitPrice);

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

  return (
    <TableRow >

      <TableCell>
        <Display name={getItemFieldName(rowIdx, 'number')} />
      </TableCell>

      <TableCell>
        <FormikPulldown name={getItemFieldName(rowIdx, 'majorItem')} options={[]} />
      </TableCell>

      <TableCell>
        <FormikPulldown name={getItemFieldName(rowIdx, 'middleItem')} options={[]} />
      </TableCell>

      <TableCell>
        <FormikPulldown name={getItemFieldName(rowIdx, 'element')} options={[]} />
      </TableCell>

      <TableCell>
        <FormikInput name={getItemFieldName(rowIdx, 'costPrice')} />
      </TableCell>

      <TableCell>
        <FormikInput name={getItemFieldName(rowIdx, 'quantity')} />
      </TableCell>

      <TableCell>
        <FormikInput name={getItemFieldName(rowIdx, 'elemProfRate')} />
      </TableCell>

      <TableCell>
        <FormikPulldown
        name={getItemFieldName(rowIdx, 'unit')}
        options={['課税', '非課ｓ税'].map((c) => ({ label: c, value: c }))}
        />
      </TableCell>

      <TableCell>
        <FormikPulldown
          name={getItemFieldName(rowIdx, 'tax')}
          options={['課税', '非課税']}
          />
      </TableCell>

      <TableCell>
        <Display name={getItemFieldName(rowIdx, 'unitPrice')} suffix={'円'}/>
      </TableCell>

      <TableCell>
        <Display name={getItemFieldName(rowIdx, 'price')} suffix={'円'}/>
      </TableCell>


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