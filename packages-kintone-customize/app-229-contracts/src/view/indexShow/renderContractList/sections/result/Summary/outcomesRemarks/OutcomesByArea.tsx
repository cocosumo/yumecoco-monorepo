import { TableCell, TableRow } from '@mui/material';
import { grey } from '@mui/material/colors';

export const OutcomesByArea = ({
  area,
  success,
  failure,
}:{
  area: string,
  success: string,
  failure: string,
}) => {

  return (
    <>
      <TableRow>
        <TableCell 
          rowSpan={2}
          sx={{
            width: 15,
            color: grey[700],
            fontWeight: 'bold',
            fontSize: 12,
            bgcolor: grey[200],
            // selector for odd rows
            '&:nth-of-type(odd)': {
              borderTop: '4px double',
              borderColor: grey[300],
            },
          }}
        >
          {area}
        </TableCell>
        <TableCell 
          sx={{
            width: 40,
            color: grey[700],
            fontWeight: 'bold',
            borderColor: grey[300],
            bgcolor: grey[100],
            whiteSpace: 'nowrap',
          }}
        >
          成功事例
        </TableCell>
        <TableCell 
          sx={{
            fontSize: 12,
          }}
        >
          {success}
        </TableCell>
      </TableRow>
      <TableRow
        sx={{
          ':not(:last-of-type) td': {
            borderBottom: '4px double',
            borderColor: grey[300],
          },
          fontSize: 12,

        }}
      >
        <TableCell
          sx={{
            color: grey[700],
            fontWeight: 'bold',
            bgcolor: grey[100],
            whiteSpace: 'nowrap',

          }}
        >
          失敗事例
        </TableCell>
        <TableCell 
          sx={{
            fontSize: 12,
          }}
        >
          {failure}
        </TableCell>
      </TableRow>
    </>
  );
};