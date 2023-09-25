import { Table, TableContainer } from '@mui/material';
import { ByStoreTHead } from './ByStoreTHead';

export const ByStoreTable = ({
  storeName,
  rec,
}:{
  storeName: string,
  rec: DB.SavedRecord[]
}) => {
  console.log(rec);

  return (
    <TableContainer>
      <Table 
        size='small'
        sx={{
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

      </Table>
    </TableContainer>
  );
};