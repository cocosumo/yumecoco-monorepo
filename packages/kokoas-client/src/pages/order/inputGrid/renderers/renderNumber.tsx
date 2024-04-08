import { RenderEditCellProps } from 'react-data-grid';
import { RowItem } from '../useColumns';
import { InputBase } from '@mui/material';
import { useEffect, useRef } from 'react';
import { convertToHalfWidth } from 'libs';

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

  //const saveChange =

  return (
    <InputBase
      type="text"
      inputRef={ref}
      defaultValue={defaultValue}
      onKeyDown={(e) => {
        if (e.key === 'Tab'
        || e.key === 'Enter'
        ) {
          // maintain focus in the grid. Need to check if this is the correct behavior. 
          onRowChange(row, true); 
        }
      
      }} 
      onChange={(e) => {
        const newValue = (e.target as HTMLInputElement).value;
        const numberVal = +convertToHalfWidth(newValue);
        let valueToSave = '';

        if (!isNaN(numberVal)) {
          valueToSave = numberVal.toString();
        } 

        onRowChange({ ...row, [key]: newValue ? valueToSave : '' }, false);
      }}

    />
  );
};

export const renderNumber = (props: RenderEditCellProps<RowItem>) => {
  return (
    <NumberInput {...props} />
  );
};