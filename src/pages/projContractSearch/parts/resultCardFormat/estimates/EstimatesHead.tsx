import { TableCell, TableHead, TableRow } from '@mui/material';
import { grey } from '@mui/material/colors';

export const EstimatesHead = () => {
  return (
    <TableHead >
      <TableRow sx={{
        '& .MuiTableCell-root': {
          fontWeight: 'bold',
          color: grey[500],
        },
      }}
      >
        <TableCell width={'8%'}>
          番号
        </TableCell>
        <TableCell>
          ステータス
        </TableCell>
        <TableCell>
          契約日
        </TableCell>
        <TableCell align='right'>
          粗利
        </TableCell>
        <TableCell align='right'>
          契約金額
        </TableCell>
        <TableCell />
      </TableRow>
    </TableHead>
  );
};