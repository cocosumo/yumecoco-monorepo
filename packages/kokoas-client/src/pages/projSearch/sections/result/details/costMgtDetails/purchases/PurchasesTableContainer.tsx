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
          '& th, & td': {
            whiteSpace: 'nowrap',
          },
          height: 'calc(90vh - 285px)', 
          '& th': {
            borderBottom: '2px solid lightgray',
            borderRight: '1px solid lightgray',
            zIndex: 3,
          },
          // sticky first column
          '& th:first-of-type, & td:first-of-type': {
            position: 'sticky',
            left: 0,
            zIndex: 5,
            backgroundColor: 'white',
            borderRight: '2px solid lightgray',
          },
          '& td:first-of-type': {
            zIndex: 2,
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