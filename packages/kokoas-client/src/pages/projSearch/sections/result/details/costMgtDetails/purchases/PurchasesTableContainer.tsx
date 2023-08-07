import { Paper, Table, TableContainer } from '@mui/material';
import { ReactNode } from 'react';

export const PurchasesTableContainer = ({
  children,
  width = 1300,
}: {
  children: ReactNode,
  width?: number,
}) => {

  return (
    <Paper>
      <TableContainer 
        sx={{ 
          overflow: 'auto',
          height: 'calc(90vh - 285px)', 
          '& th': {
            borderBottom: '1px solid lightgray',
            borderRight: '1px solid lightgray',
            
          },
        }}
      > 
        <Table 
          stickyHeader
          size="small"
          style={{ width }}
        >

          {children}

        </Table>
      </TableContainer>
    </Paper>
  );

};