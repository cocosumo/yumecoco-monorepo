import { TableRow } from '@mui/material';
import { TypeOfForm } from '../form';
import { RowContent } from './RowContent';

export type RenderRowsProps = {
  arrayHelpers: any,
  values: TypeOfForm,
};

export default function RenderRows(props: RenderRowsProps) {
  const { arrayHelpers, values } = props;
  // console.log('row values', values);

  const removeRow = (rowIdx:number) => {
    arrayHelpers.remove(rowIdx);
  };

  return (
    (values.items && (values.items.length > 0)) ?
      (
        <>
          {values.items.map((item, itemsIdx) => {
            return (
              <RowContent row={item} rowIdx={itemsIdx} removeRow={removeRow} key={values.items[itemsIdx].number} />
            );
          })}
        </>
      ) : (
        <TableRow />
      )
  );
}