import { Table, TableContainer } from '@mui/material';
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
    <TableContainer 
      sx={{
        width: '100%',
      }}
    >
      <Table 
        size='small'
        sx={{
          tableLayout: 'auto',
          width: '100%',
          '& td, & th': {
            border: '1px solid rgba(224, 224, 224, 1)',
            whiteSpace: 'nowrap',
            padding: '0px 4px',
          },
          '& th': {
            fontWeight: 'bold ',
            fontSize: '12px',
          },
        }}
      >
        <ByStoreTHead tableTitle={storeName} />

        <ByStoreTBody records={records} />

      </Table>
    </TableContainer>
  );
};