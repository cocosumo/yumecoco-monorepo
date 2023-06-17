import { useFieldArray } from 'react-hook-form';
import { TypeOfForm } from '../form';
import { Box } from '@mui/material';
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { drawerWidthAtom, menuAtom } from 'kokoas-client/src/components/MainScreen';
import { grey, orange } from '@mui/material/colors';
import { RowItem, columns } from './columns';



// compensate for container margins and paddings
const menuOffsetWidth = 66;

export const EstimatesDataGrid = () => {
  //const [rows, setRows] = useState(baseRows);
  const menuOpen = useAtomValue(menuAtom);
  const menuWidth = useAtomValue(drawerWidthAtom);
  const { fields, update } = useFieldArray<TypeOfForm>({
    name: 'items',
  });

  const fieldsWithIndex =  useMemo(
    ()=>{
      console.log('rendered');
      return fields.map((field, index) => ({ ...field, index }));
    }, 
    [fields],
  );

  // 残す。検証用
  

  /**
  * 
  * Note:
  * 
  * Kintone is throwing kintone-jserror when resizing the grid
  * when the parent is 100%.
  * 
  * Kintone suppresses "resize observer limit loop exception" so it's
  * likely that they are also experiencing this issue.
  * 
  * As a solution, I used a fixed width for the grid.  
  * Here, I set it to full width of the screen, minus the menu width.
  * 
  * Related Issue: https://github.com/adazzle/react-data-grid/pull/3261#issuecomment-1595213841
  * 
  * ~ras 2023-06-16
  */

  return (
    <Box
      sx={{
        maxWidth: `calc(100vw - ${menuOpen ? menuWidth + menuOffsetWidth : menuOffsetWidth}px)`, 
        height: '70vh',
        '& .index' : {
          fontSize: 8,
          textAlign: 'center',
        },
        '& .index-header' : {
          bgcolor: grey[50],
          fontSize: 8,
          textAlign: 'center',
          px: 0,
        },
        // select odd rows, except the first column
        '& .rdg-row:nth-child(odd) .rdg-cell:not(:first-child)' : {
          bgcolor: orange[50],
        },
        '& div[aria-readonly="true"]': {
          bgcolor: grey[100],
        },
      }}
    
    >  
      <DataGrid 
        rowKeyGetter={(row: RowItem ) => row.id}
        className='rdg-light' // enforce light theme 
        columns={columns} 
        rows={fieldsWithIndex}
        defaultColumnOptions={{
          resizable: true,
          width: 'max-content',
          minWidth: 100,
        }}
        onRowsChange={() => {

        }} 
        style={{ height: '100%' }}
      />
    </Box>
  );
};