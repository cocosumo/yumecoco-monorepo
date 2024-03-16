import { Autocomplete, TextField } from '@mui/material';
import { RenderEditCellProps } from 'react-data-grid';
import { RowItem } from '../useColumns';
import { useEffect, useRef } from 'react';

type CustomProps = {
  data : string[] | undefined;
};

export const CustomAutomplete = ({
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
  
  return (
    <Autocomplete
      value={row[key as keyof RowItem] as string ?? ''}
      disableClearable
      freeSolo
      options={data ?? []}
      onChange={(_, value) => {
        onRowChange({ ...row, [key]: value || '' }, true);
      }}
      onBlur={(e) => {
        onRowChange({ ...row, [key]: (e.target as HTMLInputElement).value }, true);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Tab' || e.key === 'Enter') {
          onRowChange({ ...row, [key]: (e.target as HTMLInputElement).value || '' }, true);
        }
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
          sx={{
            height: '100%',
            width: 'calc(100% - 8px)',
          }}  
        />
      )}
    />
  );
};