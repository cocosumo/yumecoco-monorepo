import { TableBody, TableRow } from '@mui/material';
import { ReactNode } from 'react';

export const SummaryContentsContainer = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <TableBody>
      <TableRow sx={{
        '& td': {
          whiteSpace: 'nowrap',
        },
      }}
      >
        {children}
      </TableRow>
    </TableBody>
  );
};