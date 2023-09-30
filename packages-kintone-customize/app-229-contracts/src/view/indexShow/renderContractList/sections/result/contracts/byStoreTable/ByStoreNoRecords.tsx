import { TableBody, TableCell, TableRow } from '@mui/material';

export const ByStoreNoRecords = () => {
    
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={6} align='center' 
          style={{
            padding: '12px 0px',
            background: 'white',
          }}
        >
          データがありません
        </TableCell>
      </TableRow>
    </TableBody>);
};