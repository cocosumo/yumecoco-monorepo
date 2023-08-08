import { Paper, Table, TableContainer } from '@mui/material';
import { grey, yellow } from '@mui/material/colors';
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
            borderRight: '1px solid',
            borderColor: grey[200],
          },
          height: 'calc(90vh - 285px)', 
          '& th': {
            borderBottom: '2px solid lightgray',
            borderRight: '1px solid lightgray',
            zIndex: 1,
          },
          
          '& th:first-of-type, & td:first-of-type': {
            position: 'sticky',
            left: 0,
            zIndex: 5,
            backgroundColor: 'white',
            borderRight: '2px solid lightgray',

          },
          /*           '& th:nth-of-type(2), & td:nth-of-type(2)': {
            position: 'sticky',
            borderRight: '2px solid lightgray',
            left: firstColumnWidth,
            backgroundColor: 'white',
            zIndex: 10,
          }, */

          '& td:first-of-type, & th:nth-of-type(2)': {
            zIndex: 2,
          },

          '& tr:nth-of-type(even) td': {
            backgroundColor: yellow[50],
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