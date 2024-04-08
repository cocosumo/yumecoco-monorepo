import { RenderCellProps } from 'react-data-grid';
import { RowItem } from '../useColumns';
import { Checkbox, styled } from '@mui/material';

const CustomCheckbox = styled(Checkbox)({
  padding: 0,
  margin: 0,
});

const SelectRow = (_: RenderCellProps<RowItem>) => {

  return (
    <CustomCheckbox defaultChecked />
  );
};

export const renderCheckbox = (props: RenderCellProps<RowItem>) => {
  return (
    <SelectRow {...props}  />
  );
};