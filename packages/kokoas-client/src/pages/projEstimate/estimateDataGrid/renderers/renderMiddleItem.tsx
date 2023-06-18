import { RenderEditCellProps } from 'react-data-grid';
import { RowItem } from '../columns';
import { useMaterialsMid } from 'kokoas-client/src/hooksQuery';
import { Autocomplete, TextField } from '@mui/material';
import { useRef } from 'react';

/** 中項目 */
const MiddleItemSelect = ({
  row,
  onRowChange,
}: RenderEditCellProps<RowItem>) => {
  const ref = useRef<HTMLInputElement>(null);

  const { data } = useMaterialsMid({
    select: (d) => d
      .filter(({ 大項目名: majorItem }) => majorItem.value === row.majorItem)
      .map(({ 中項目名: midItem }) => midItem.value ),
  });

  return (
    <Autocomplete
      openOnFocus
      value={row.middleItem ?? undefined}
      freeSolo
      options={data ?? []}
      onChange={(_, value) => {
        onRowChange({ ...row, middleItem: value }, true);
      }}
      onBlur={(e) => {
        onRowChange({ ...row, middleItem: (e.target as HTMLInputElement).value }, true);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size='small'
          fullWidth
          autoFocus
          inputRef={ref}
          onFocus={(e) => {
            setTimeout(() => {
              e.target.select();
            }, 50);
          }} 
          variant='standard'
          InputProps={{
            ...params.InputProps,
            // type: 'search',
            disableUnderline: true,
          }}  
          sx={{
            pt: '4px',
            px: '4px',
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