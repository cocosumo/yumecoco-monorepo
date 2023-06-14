import { Paper, Table, TableContainer } from '@mui/material';
import { ReactNode } from 'react';
import { EstTableHead } from './EstTableHead';

export const EstTableContainer = ({
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
      height: 'calc(80vh - 130px)',
    }}
    >
      <TableContainer 
        sx={{
          height: 'calc(100% - 72px)', 
        }}
      >
        <Table 
          stickyHeader
          size="small"
        >
          <EstTableHead />
          {body}
        </Table>
        
      </TableContainer>

      {footer}
    </Paper>

  );
};