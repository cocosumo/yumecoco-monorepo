import { Autocomplete, TextField } from '@mui/material';
import { RenderEditCellProps } from 'react-data-grid';
import { RowItem } from '../useColumns';
import { useEffect, useRef } from 'react';

type CustomProps = {
  data : string[] | undefined;
};

export const CustomAutocomplete = ({
  row,
  data,
  column,
  onRowChange,
}: RenderEditCellProps<RowItem> & CustomProps) => {
  const ref = useRef<HTMLInputElement>(null);
 
  const { key } = column;
  
  useEffect(
    () => {
      if (ref.current) {
        setTimeout(() => ref.current?.select(), 0); 
      }
    }, 
    [ref],
  );

  const uniqueData = Array.from(new Set(data));
  
  
  return (
    <Autocomplete
      value={row[key as keyof RowItem] as string ?? ''}
      disableClearable
      freeSolo
      options={uniqueData ?? []}
      onChange={(_, value) => {
        onRowChange({ ...row, [key]: value || '' }, true);
        console.log('CHANGED!');
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size='small'
          fullWidth
          inputRef={ref}
          variant='standard'
          InputProps={{
            ...params.InputProps,
            // type: 'search',
            disableUnderline: true,
            style: {
              padding: '0',
              height: '100%',
            },
            sx: {
              height: '100%',
              margin: '4px',
            },
          }}
          placeholder='選択 ↓'
          sx={{
            height: '100%',
            width: 'calc(100% - 8px)',
          }}  
        />
      )}
    />
  );
};