import { Button, TableCell, TableRow } from '@mui/material';
import { materialsLabelList } from '../constantDefinition';
import { TypeOfForm } from '../form';
import InputCellContent from './InputCellContent';

export type RenderRowsProps = {
  arrayHelpers: any,
  values: TypeOfForm,
};

export default function RenderRows(props: RenderRowsProps) {
  const { arrayHelpers, values } = props;

  return (
    (values.items && (values.items.length > 0)) ?
      (
        <>
          {values.items.map((item, itemsIdx) => {
            return (
              <TableRow key={`${item}${itemsIdx}_row`}>
                {Object.keys(item).map((rowitem, rowIdx) => {
                  return (
                    <TableCell
                      key={`${rowitem}_header`}
                      sx={{
                        padding: 1,
                        verticalAlign: 'top',
                      }}
                    >
                      <InputCellContent name={`items[${itemsIdx}][${Object.keys(materialsLabelList)[rowIdx]}]`}/>
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
          })}
        </>
      ) : (
        <TableRow />
      )
  );
}