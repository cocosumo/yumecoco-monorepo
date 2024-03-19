import { RenderEditCellProps } from 'react-data-grid';
import { RowItem } from '../useColumns';
import { InputBase } from '@mui/material';
import { useEffect, useRef } from 'react';

const NumberInput = (props: RenderEditCellProps<RowItem>) => {
  const ref = useRef<HTMLInputElement>(null);
  const { row, onRowChange, column } = props;
  const { key } = column;
  
  useEffect(
    () => {
      if (ref.current) {
        setTimeout(() => ref.current?.select(), 0); 
      }
    }, 
    [ref],
  );

  const rawDefaultValue = row[key as keyof RowItem];
  const defaultValue = rawDefaultValue ? Math.round(+rawDefaultValue) : '';

  return (
    <InputBase
      type="number"
      inputRef={ref}
      defaultValue={defaultValue}
      onKeyDown={(e) => {
        if (e.key === 'Tab'
          || e.key === 'Enter'
        ) {
          const newValue = (e.target as HTMLInputElement).value;
          onRowChange({ ...row, [key]: newValue ? Number((e.target as HTMLInputElement).value || '') : '' }, true);
        }
      }}
    />
  );
};

export const renderNumber = (props: RenderEditCellProps<RowItem>) => {
  return (
    <NumberInput {...props} />
  );
};