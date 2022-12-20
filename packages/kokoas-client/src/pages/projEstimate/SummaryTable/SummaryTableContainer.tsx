import { Box, Paper, Table, TableContainer } from '@mui/material';
import { useMenuContext } from 'kokoas-client/src/hooks/useMenuContext';
import { ReactNode } from 'react';

export const SummaryTableContainer = ({
  children,
}: {
  children: ReactNode
}) => {

  const {
    menuOpen,
    drawWidth,
  } = useMenuContext();

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '16px',
        transform: 'translateX(-50%)',
        left: '50%',
        ml: menuOpen ? `${drawWidth / 2}px` : '0px',
      }}
    >
      <TableContainer component={Paper}>
        <Table size="small" >
          {children}
        </Table>
      </TableContainer>
    </Box>
  );
};