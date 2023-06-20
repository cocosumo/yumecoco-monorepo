import { RenderEditCellProps } from 'react-data-grid';
import { RowItem } from '../useColumns';
import { useUnits } from 'kokoas-client/src/hooksQuery';
import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';


const UnitsSelect = ({
  row,
  onRowChange,

}: RenderEditCellProps<RowItem>) => {
  const [open, setOpen] = useState(true);
  const { data } = useUnits((u) => {
    return u.map(({
      unit,
    }) => ({
      value: unit.value,
    }));
  });

  return (
    <Select
      value={row.unit || undefined}
      onChange={(event) => onRowChange({ ...row, unit: event.target.value }, true)}
      autoFocus
      size='small'
      open={open}
      fullWidth
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      {data?.map(({ value }) => (
        <MenuItem key={value} value={value}>
          {value}
        </MenuItem >
      ))}
    </Select>
  );
};

export const renderUnits = (props: RenderEditCellProps<RowItem>) => {
  return (
    <UnitsSelect {...props} />
  );
};