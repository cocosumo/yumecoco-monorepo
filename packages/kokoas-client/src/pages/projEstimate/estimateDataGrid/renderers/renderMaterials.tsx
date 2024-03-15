import { RenderEditCellProps } from 'react-data-grid';
import { RowItem } from '../useColumns';
import { Autocomplete, TextField } from '@mui/material';
import { useMaterialsItem } from 'kokoas-client/src/hooksQuery';
import { useRef } from 'react';


/** 部材 */
const Materials = (props: RenderEditCellProps<RowItem>) => {
  const ref = useRef<HTMLInputElement>(null);
  const { row, onRowChange } = props;
  const { data } = useMaterialsItem({
    select: (d) => d.filter(({ 大項目名: majorItem }) => majorItem.value === row.majorItem)
      .map(({ 部材名: materialName }) => materialName.value),
  });



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
      renderInput={(params) => (
        <TextField
          {...params}
          size='small'
          fullWidth
          autoFocus
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
          onInput={(e) => {
            console.log(e);
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