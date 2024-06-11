import { RenderCellProps } from 'react-data-grid';
import { RowItem } from '../useColumns';
import { Checkbox, styled } from '@mui/material';

const CustomCheckbox = styled(Checkbox)({
  padding: 0,
  margin: 0,
});

const SelectRow = (props: RenderCellProps<RowItem>) => {
  const { row, onRowChange, column } = props;
  const { key } = column;

  return (
    <CustomCheckbox 
      onChange={() => {
        onRowChange({ ...row, [key]: !row.selected });
      }} 
      checked={row[key as keyof RowItem] as boolean}
    />
  );
};

export const renderCheckbox = (props: RenderCellProps<RowItem>) => {
  return (
    <SelectRow {...props}  />
  );
};