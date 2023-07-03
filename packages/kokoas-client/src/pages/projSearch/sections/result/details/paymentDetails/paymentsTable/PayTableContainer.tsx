import { Paper, Table, TableContainer } from '@mui/material';
import { ReactNode } from 'react';
import { PayTableHead } from './PayTableHead';

export const PayTableContainer = ({
  body,
  footer,
}:{
  body: ReactNode,
  footer: ReactNode,
}) => {
  return (
    <Paper sx={{ 
      width: '100%', 
      overflow: 'hidden', 
      height: 'calc(60vh - 100px)',
    }}
    >
      <TableContainer 
        sx={{
          width: '100%',
          height: 'calc(100% - 72px)', 
          '& th': {
            py: 2,
            fontWeight: 'bold',
            color: 'text.secondary',
          },
        }}
      >
        <Table 
          stickyHeader
          size="small"
          sx={{
            width: '100%',
          }}
        >
          <PayTableHead />
          {body}
        </Table>
        
      </TableContainer>

      {footer}
    </Paper>

  );
};