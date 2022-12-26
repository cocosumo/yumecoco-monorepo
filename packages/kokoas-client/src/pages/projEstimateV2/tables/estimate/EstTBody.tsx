import { TableBody, TableCell, TableRow } from '@mui/material';
import {
  useMemo,
} from 'react';
import { UseFieldArrayReturn } from 'react-hook-form';
import { TypeOfForm } from '../../form';
import { UseManipulateItemRows } from '../../hooks/useManipulateItemRows';
import { EstTRow } from './EstTRow';


export const EstTBody = ({
  isDisabled,
  fieldArrayHelpers,
  ...rowMethods
}: UseManipulateItemRows & {
  isDisabled: boolean,
  fieldArrayHelpers: UseFieldArrayReturn<TypeOfForm>
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
            key={row.id}
            rowIdx={rowIdx}
            isAtBottom={isAtBottom}
            isVisible={!isDisabled}
            rowsLength={rowsLength}
            isDisabled={isDisabled}
          />
        );
      })}
      <TableRow >
        <TableCell colSpan={'100%' as unknown as number}>

        </TableCell>
      </TableRow>
    </TableBody>
  );

};