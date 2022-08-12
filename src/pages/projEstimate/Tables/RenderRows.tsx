import { Button, FormControl, Input, TableCell, TableRow } from '@mui/material';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../form';

/* function createData(
  number: number,
  majorItem: string,
  middleItem: string,
  element: string,
  costPrice: string,
  quantity: string,
  elemProfRate: number,
  unit: string,
  tax: string,
  unitPrice: number,
  price: number,
) {
  return {
    number,
    majorItem,
    middleItem,
    element,
    costPrice,
    quantity,
    elemProfRate,
    unit,
    tax,
    unitPrice,
    price,
  };
} */

/* const rows = [
  createData(0, '', '', '', '', '', 0, '', '', 0, 0),
]; */

export default function RenderRows(arrayHelpers) {
  const { values } = useFormikContext<TypeOfForm>();

  return (
    values.items.map((item, itemsIdx) => {
      console.log(`item ${itemsIdx}`, item);
      return (
        <TableRow key={`${item}${itemsIdx}_row`}>
          {Object.keys(item).map((rowitem, rowIdx) => {
            console.log('rowitem', rowIdx, '::', item[rowitem]);
            return (
              <TableCell
                key={`${rowitem}_header`}
                sx={{ padding: 1 }}
              >
                <FormControl variant="standard">
                  <Input
                    id="component-simple"
                    value={item[rowitem].value}
                  /*  onChange={handleChange} */
                  />
                </FormControl>
              </TableCell>
            );
          })}
          <TableCell key={`${item}_delBtn`}>
            <Button
              variant="outlined"
              onClick={() => arrayHelpers.remove(itemsIdx)}
            >
              -
            </Button>
          </TableCell>
        </TableRow>
      );
    })
  );
}