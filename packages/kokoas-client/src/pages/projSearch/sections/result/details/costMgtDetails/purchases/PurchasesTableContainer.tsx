import { Paper, Table, TableContainer } from '@mui/material';
import { grey, yellow } from '@mui/material/colors';
import { ReactNode } from 'react';


export const PurchasesTableContainer = ({
  children,
  width = 1300,
  allWidth,
}: {
  children: ReactNode,
  width?: number,
  allWidth: number[],
}) => {

  const [col1Width, col2Width] = allWidth;

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
          },
          '& th:nth-of-type(2), & td:nth-of-type(2)': {
            position: 'sticky',
            left: col1Width,
            zIndex: 5,
            backgroundColor: 'white',
            borderLeft: '2px solid lightgray',
          },
          '& th:nth-of-type(3), & td:nth-of-type(3)': {
            position: 'sticky',
            left: col1Width + col2Width,
            zIndex: 5,
            backgroundColor: 'white',
            borderLeft: '2px solid lightgray',
            borderRight: '2px solid lightgray',
          },

          // sticky last column
          '& th:last-of-type, & td:last-of-type': {
            position: 'sticky',
            right: 0,
            zIndex: 5,
            backgroundColor: 'white',
            borderLeft: '2px solid lightgray',
            boxShadow: '2px 0px 2px lightgray',
          },

          '& th:first-of-type, th:nth-of-type(2), th:nth-of-type(3), th:last-of-type' : {
            zIndex: 10,
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