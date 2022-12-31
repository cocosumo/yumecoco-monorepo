import { TableBody, TableCell, TableRow } from '@mui/material';
import {
  useMemo,
} from 'react';
import { UseFieldArrayReturn } from 'react-hook-form';
import { TypeOfForm } from '../../form';
import { UseManipulateItemRows } from '../../hooks/useManipulateItemRows';
import { UseSmartHandlers } from '../../hooks/useSmartHandlers';
import { EstTableActions } from './EstTableActions';
import { EstTRow } from './EstTRow';


export const EstTBody = ({
  isDisabled,
  fieldArrayHelpers,
  smartHandlers,
  ...rowMethods
}: UseManipulateItemRows & {
  isDisabled: boolean,
  fieldArrayHelpers: UseFieldArrayReturn<TypeOfForm>
  smartHandlers : UseSmartHandlers,
}) => {


  const  { fields: rows } = fieldArrayHelpers;

  const rowsLength = useMemo(() => rows.length, [rows]);

  return (

    <TableBody>

      {rows.map((row, rowIdx) => {

        const isAtBottom = rowIdx === (rowsLength - 1);
        return (
          <EstTRow
            {...rowMethods}
            id={row.id}
            key={row.id}
            rowIdx={rowIdx}
            isAtBottom={isAtBottom}
            isVisible={!isDisabled}
            smartHandlers={smartHandlers}
          />
        );
      })}
      <TableRow >
        <TableCell colSpan={'100%' as unknown as number}>
          <EstTableActions {...rowMethods} />
        </TableCell>
      </TableRow>
    </TableBody>
  );

};