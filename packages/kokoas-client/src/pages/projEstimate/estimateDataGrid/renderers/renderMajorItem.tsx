import { RenderEditCellProps } from 'react-data-grid';
import { RowItem } from '../useColumns';
import { useMaterialsMajor } from 'kokoas-client/src/hooksQuery';
import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';


/** 大項目 */
const MajorItemSelect = ({
  row,
  onRowChange,
}: RenderEditCellProps<RowItem>) => {
  const [open, setOpen] = useState(true);

  const { data } = useMaterialsMajor({
    select: (d) => d
      .map(({ 大項目名: majorItemName }) => ({ value: majorItemName.value }) ),
  });

  return (
    <Select
      value={row.majorItem ?? ''}
      onChange={(event) => onRowChange({ ...row, majorItem: event.target.value }, true)}
      autoFocus
      size='small'
      open={open}
      fullWidth
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <MenuItem value={''}>
        ---
      </MenuItem >
      {data?.map(({ value }) => (
        <MenuItem key={value} value={value}>
          {value}
        </MenuItem >
      ))}
    </Select>
  );
};

export const renderMajorItem = (props: RenderEditCellProps<RowItem>) => {
  return (
    <MajorItemSelect {...props} />
  );
};