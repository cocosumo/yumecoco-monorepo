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
    return u?.map(({
      unit,
    }) => ({
      value: unit.value,
    }));
  });

  // Prevent warning from MUI Select #https://github.com/mui/material-ui/issues/18494#issuecomment-782779777
  if (!data) return null; 

  return (
    <Select
      value={row.unit || ''}
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