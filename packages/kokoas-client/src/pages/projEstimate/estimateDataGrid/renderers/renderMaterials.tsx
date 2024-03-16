import { RenderEditCellProps } from 'react-data-grid';
import { RowItem } from '../useColumns';
import { Autocomplete, TextField } from '@mui/material';
import { useMaterialsItem } from 'kokoas-client/src/hooksQuery';
import { useEffect, useRef } from 'react';


/** 部材 */
const Materials = (props: RenderEditCellProps<RowItem>) => {
  const ref = useRef<HTMLInputElement>(null);
  const { row, onRowChange } = props;
 
  const { data } = useMaterialsItem({
    select: (d) => d.filter(({ 大項目名: majorItem }) => majorItem.value === row.majorItem)
      .map(({ 部材名: materialName }) => materialName.value),
  });

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
      value={row.material ?? undefined}
      freeSolo
      options={data ?? []}
      onChange={(_, value) => {
        onRowChange({ ...row, material: value || '' }, true);
      }}
      onBlur={(e) => {
        onRowChange({ ...row, material: (e.target as HTMLInputElement).value }, true);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Tab') {
          onRowChange({ ...row, material: (e.target as HTMLInputElement).value || '' }, true);
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
          }} 
          sx={{
            pt: '4px',
          }}
        />
      )}
    />
  );
};

export const renderMaterials = (props: RenderEditCellProps<RowItem>) => {
  return (
    <Materials {...props} />
  );
};