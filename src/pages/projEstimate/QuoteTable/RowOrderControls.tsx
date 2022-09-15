import { IconButton, TableCell } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FieldArrayRenderProps, FormikProps } from 'formik';
import { TypeOfForm } from '../form';

export const RowOrderControls = ({
  rowIdx, arrayHelpers,
}: {
  rowIdx: number
  arrayHelpers: FieldArrayRenderProps,
}) => {
  const { form } = arrayHelpers;
  const { values: { items } } = form as FormikProps<TypeOfForm>;

  const isAtBottom = rowIdx  === (items.length - 1);
  const isAtTop = rowIdx === 0;

  return (
    <TableCell size='small' sx={{
      pl: 1, pr: 0,
    }}
    >
      <IconButton size='small' disabled={isAtTop}>
        <KeyboardArrowUpIcon />
      </IconButton>

      <IconButton size='small' disabled={isAtBottom}>
        <KeyboardArrowDownIcon />
      </IconButton>
    </TableCell>

  );
};