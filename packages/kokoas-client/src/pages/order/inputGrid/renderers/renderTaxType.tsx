import { RenderEditCellProps } from 'react-data-grid';
import { RowItem } from '../useColumns';
import { MenuItem, Select, styled } from '@mui/material';
import { useState } from 'react';

const CustomSelect = styled(Select)({
  padding: '0',
});

const TaxType = (props: RenderEditCellProps<RowItem>) => {
  const [open, setOpen] = useState(true);

  const {
    row,
    onRowChange,
  } = props;

  const {
    taxRate,
  } = row;

  return (
    <CustomSelect
      fullWidth
      open={open}
      size='small'
      value={taxRate || 0}
      onChange={(_, value) => {
        onRowChange({ ...row, taxRate: value as number }, true);
      }}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <MenuItem value={0.1}>
        課税
      </MenuItem>
      <MenuItem value={0}>
        非課税
      </MenuItem>
    </CustomSelect>
  );
};

export const renderTaxType = (props: RenderEditCellProps<RowItem>) => {
  return (
    <TaxType {...props} />
  );
};