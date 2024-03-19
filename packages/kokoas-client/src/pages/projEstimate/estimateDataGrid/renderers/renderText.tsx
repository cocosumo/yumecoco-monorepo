import { RenderEditCellProps } from 'react-data-grid';
import { RowItem } from '../useColumns';
import { InputBase } from '@mui/material';
import { useEffect, useRef } from 'react';

const TextInput = (props: RenderEditCellProps<RowItem>) => {
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


  return (
    <InputBase
      type="text"
      inputRef={ref}
      defaultValue={row[key as keyof RowItem] ?? ''}
      onKeyDown={(e) => {
        if (e.key === 'Tab'
          || e.key === 'Enter'
        ) {
          onRowChange({ ...row, [key]: (e.target as HTMLInputElement).value || '' }, true);
        }
      }}
    />
  );
};

export const renderText = (props: RenderEditCellProps<RowItem>) => {
  return (
    <TextInput {...props} />
  );
};