import { TableRow } from '@mui/material';
import { FieldArrayRenderProps } from 'formik';
import { TypeOfForm } from '../form';
import { RowContent } from './RowContent';

export type RenderRowsProps = {
  arrayHelpers: FieldArrayRenderProps,
  values: TypeOfForm,
};

export default function RenderRows(props: RenderRowsProps) {
  const { arrayHelpers, values } = props;
  // console.log('row values', values);

  const removeRow = (rowIdx: number) => {
    arrayHelpers.remove(rowIdx);
  };

  return (
    (values.items && (values.items.length > 0)) ?
      (
        <>
          {values.items.map((item, itemsIdx) => {
            return (
              <RowContent
                taxRate={values.taxRate}
                row={item}
                rowIdx={itemsIdx}
                removeRow={removeRow}
                key={item.number}
              />
            );
          })}
        </>
      ) : (
        <TableRow />
      )
  );
}