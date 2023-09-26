import { Box, Table, TableContainer } from '@mui/material';
import { ByStoreTHead } from './ByStoreTHead';
import { ByStoreTBody } from './ByStoreTBody';

export const ByStoreTable = ({
  storeName,
  records,
}:{
  storeName: string,
  records: DB.SavedRecord[]
}) => {

  return (
    <TableContainer>
      {/* 
        Tried to set the title as the first row in thead but 
        column widths were ignored.
      */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          height: '30px',
          fontWeight: 'bold',
          fontSize: '16px',
          bgcolor: '#e0e0e0',
        }}
        
      >
        {storeName}
      </Box>
      <Table 
        size='small'
        sx={{
          tableLayout: 'fixed',
          width: '100%',
          '& td, & th': {
            border: '1px solid rgba(224, 224, 224, 1)',
            whiteSpace: 'nowrap',
            padding: '0px 4px',
            overflow: 'hidden',
          },
          '& th': {
            fontWeight: 'bold ',
            fontSize: '12px',
          },
        }}
      >
        <ByStoreTHead />
        <ByStoreTBody records={records} />

      </Table>
    </TableContainer>
  );
};