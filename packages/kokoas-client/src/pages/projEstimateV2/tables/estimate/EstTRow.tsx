import { TableCell, TableRow } from '@mui/material';
import { Control } from 'react-hook-form';
import { TypeOfForm } from '../../form';
import { headers } from './EstTHead';
import { EstRowMove } from './rowActions/EstRowMove';

export const EstTRow = ({
  rowIdx,
  //control,
  isVisible,
  isAtBottom,
  rowsLength,
}: {
  rowIdx: number,
  control: Control<TypeOfForm>
  isAtBottom: boolean,
  isVisible: boolean
  rowsLength: number,
}) => {
  return (
    <>
      <TableRow>
        <TableCell
          rowSpan={2}
          width={headers[0].width}
          sx={{
            pl: 1, pr: 0,
          }}
        >
          <EstRowMove 
            isAtBottom={isAtBottom}
            isVisible={isVisible}
            rowIdx={rowIdx}
            rowLength={rowsLength}
          />
        </TableCell>

        
      </TableRow>
      <TableRow>
        
      </TableRow>
    </>
  );
};