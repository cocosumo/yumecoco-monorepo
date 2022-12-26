import { TableBody } from '@mui/material';
import {
  useMemo,
} from 'react';
import { useFieldArray } from 'react-hook-form';
import { KeyOfForm, TypeOfForm } from '../../form';
import { EstTRow } from './EstTRow';

const name: KeyOfForm = 'items';

export const EstTBody = ({
  isDisabled,
}: {
  isDisabled: boolean,
}) => {


  const fieldArrayHelpers = useFieldArray<TypeOfForm>({
    name,
  });

  const  { fields: rows } = fieldArrayHelpers;

  const rowsLength = useMemo(() => rows.length, [rows]);

  return (

    <TableBody>

      {rows.map((row, rowIdx) => {

        const isAtBottom = rowIdx === (rowsLength - 1);
        return (
          <EstTRow
            key={row.id}
            rowIdx={rowIdx}
            isAtBottom={isAtBottom}
            isVisible={!isDisabled}
            rowsLength={rowsLength}
            isDisabled={isDisabled}
            fieldArrayHelpers={fieldArrayHelpers}
          />
        );
      })}
    </TableBody>
  );

};