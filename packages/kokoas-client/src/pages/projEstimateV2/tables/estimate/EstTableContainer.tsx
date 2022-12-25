import { Paper, Table, TableContainer } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ReactNode } from 'react';

export const EstTableContainer = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <TableContainer
      variant={'outlined'}
      component={Paper}
    >
      <Table 
        size="small"
        sx={{
          minWidth: 650,
          overflow: 'hidden',
          tableLayout: 'fixed',
          '& td': {
            px: 0.5,
          },
          '& tr:nth-of-type(odd) td:not(:nth-of-type(-n+3))' : {
            borderBottom: 'none',
            pt: 2,
            pb: 0,
          },
          '& tr:nth-of-type(even) td:not(:nth-of-type(-n+1))' : {
            pt: 1,
            pb: 2,
          },
          '& tr:nth-of-type(4n), & tr:nth-of-type(4n-1)' : {
            background:  grey[100], 
          },
          '& tr:nth-last-child(-n+2)': {
            opacity: 0.5,
            '&:hover':{
              opacity: 1,
            },
          },

        }}
      >
        {children}
      </Table>
    </TableContainer>
  );
};