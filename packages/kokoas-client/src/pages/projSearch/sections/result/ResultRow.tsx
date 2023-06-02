import { TableRow } from '@mui/material';
import { RowLayout, RowLayoutProps } from './RowLayout';

export const ResultRow = (props: RowLayoutProps) => {
  return (
    <TableRow 
      sx={{
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <RowLayout {...props} />
    </TableRow>
  );
};