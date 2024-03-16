import { RenderEditCellProps } from 'react-data-grid';
import { RowItem } from '../useColumns';
import { useMaterialsMajor } from 'kokoas-client/src/hooksQuery';
import { Autocomplete, TextField } from '@mui/material';
import { useCallback, useEffect, useRef } from 'react';


/** 大項目 */
const MajorItemSelect = ({
  row,
  onRowChange,
}: RenderEditCellProps<RowItem>) => {
  const ref = useRef<HTMLInputElement>(null);

  const { data } = useMaterialsMajor({
    select: useCallback(
      (d) => d
        .map(({ 大項目名: majorItemName }) => majorItemName.value ),
      [],
    ),
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
      value={row.majorItem ?? ''}
      disableClearable
      freeSolo
      options={data ?? []}
      //defaultValue={row.majorItem}
      onChange={(_, value) => {
        onRowChange({ ...row, majorItem: value || '' }, true);
      }}
      onBlur={(e) => {
        onRowChange({ ...row, majorItem: (e.target as HTMLInputElement).value }, true);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Tab') {
          onRowChange({ ...row, majorItem: (e.target as HTMLInputElement).value || '' }, true);
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

export const renderMajorItem = (props: RenderEditCellProps<RowItem>) => {
  return (
    <MajorItemSelect {...props} />
  );
};