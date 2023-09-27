import { TableCell, TableHead, TableRow } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ProspectNextMonthHead } from './ProspectNextMonthHead';

export const ProspectHead = () => {
  return (
    <TableHead
      sx={{
        bgcolor: grey[50],
        '& th' :{
          border: '1px solid',
          borderColor: grey[300],

          fontWeight: 'bold',
          color: grey[700],
          // align all cells to center
          textAlign: 'center',
        },
      }}
    >

      <TableRow
        sx={{
          '& th:first-of-type': {
            bgcolor: grey[200],
            borderRight: '4px double',
            borderColor: grey[300],
          },
        }}
      >
        <TableCell 
          colSpan={4}
        >
          いつの見込み案件か
        </TableCell>

        <ProspectNextMonthHead />
      </TableRow>

      <TableRow
        sx={{
          '& th': {
            fontSize: 12,
            borderRight: '4px double',
            borderColor: grey[300],
          },
        }}
      >
        <TableCell colSpan={2}>
          前月以前の反響
        </TableCell>
        <TableCell colSpan={2}>
          当月での反響
        </TableCell>

      </TableRow>

      <TableRow
        sx={{
          '& th:nth-of-type(2n):not(:last-of-type)': {
            borderRight: '4px double',
            borderColor: grey[300],
          },
        }}
      >
      
        <TableCell>
          件数
        </TableCell>
        <TableCell>
          金額
        </TableCell>

        <TableCell>
          件数
        </TableCell>
        <TableCell>
          金額
        </TableCell>

        <TableCell>
          件数
        </TableCell>
        <TableCell >
          金額
        </TableCell>

      </TableRow>
      
    </TableHead>
  );
};