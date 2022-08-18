import { Button, TableCell, TableRow } from '@mui/material';
import { materialsLabelList, TFullMaterials } from '../form';
import CellContent from './CellContent';
// import { useFormikContext } from 'formik';
// import { TypeOfForm } from '../form';

export type RenderRowsProps = {
  arrayHelpers: any,
  values: TFullMaterials,
};

export default function RenderRows(props: RenderRowsProps) {
  const { arrayHelpers, values } = props;

  // const { values } = useFormikContext<TypeOfForm>();
  // console.log('arrayHelpers::sub ', arrayHelpers);
  console.log(' RenderRows(arrayHelpers)', values);

  /* const handleChange = (e) => {
    // console.log('handleChange', e);
    const itemsIdx = e.target.name.split('_')[0];
    const rowIdx = e.target.name.split('_')[1];
    const tgtLabel = materialsLabelList[rowIdx];

    // console.log(`itemsIdx:: ${itemsIdx} , rowIdx:: ${rowIdx}`);
    return (
      values.items[itemsIdx][tgtLabel] = e.target.value
    );
  }; */

  return (
    (values.items && (values.items.length > 0)) ?
      (
        <>
          {values.items.map((item, itemsIdx) => {
            console.log(`item ${itemsIdx}`, item);
            return (
              <TableRow key={`${item}${itemsIdx}_row`}>
                {Object.keys(item).map((rowitem, rowIdx) => {
                  /* console.log('rowitem', rowIdx, '::', item[rowitem]); */
                  return (
                    <TableCell
                      key={`${rowitem}_header`}
                      sx={{
                        padding: 1,
                        verticalAlign: 'top',
                      }}
                    >
                      <CellContent name={`items[${itemsIdx}][${materialsLabelList[rowIdx]}]`}/>
                      {/* <FormControl variant="standard">
                        <Input name={`${itemsIdx}_${rowIdx}`} value={item[rowitem].value} />
                      </FormControl> */}
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