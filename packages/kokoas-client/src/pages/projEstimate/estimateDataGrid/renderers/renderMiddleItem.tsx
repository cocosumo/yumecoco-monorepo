import { RenderEditCellProps } from 'react-data-grid';
import { RowItem } from '../useColumns';
import { useMaterialsMid } from 'kokoas-client/src/hooksQuery';
import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useRef } from 'react';

/** 中項目 */
const MiddleItemSelect = ({
  row,
  onRowChange,
}: RenderEditCellProps<RowItem>) => {
  const ref = useRef<HTMLInputElement>(null);

  const { data } = useMaterialsMid({
    select: (d) => d
      .filter(({ 大項目名: majorItem }) => !row.majorItem || row.majorItem === majorItem.value )
      .map(({ 中項目名: midItem }) => midItem.value ),
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
      value={row.middleItem ?? ''}
      freeSolo
      options={data ?? []}
      onChange={(_, value) => {
        onRowChange({ ...row, middleItem: value || '' }, true);
      }}
      onBlur={(e) => {
        onRowChange({ ...row, middleItem: (e.target as HTMLInputElement).value }, true);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Tab') {
          onRowChange({ ...row, middleItem: (e.target as HTMLInputElement).value || '' }, true);
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

export const renderMiddleItem = (props: RenderEditCellProps<RowItem>) => {
  return (
    <MiddleItemSelect {...props} />
  );
};