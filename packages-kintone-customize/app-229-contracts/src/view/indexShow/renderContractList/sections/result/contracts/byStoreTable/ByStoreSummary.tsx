import { TableCell, TableFooter, TableRow } from '@mui/material';
import { grey } from '@mui/material/colors';

export const ByStoreSummary = ({
  records,
}:{
  records: DB.SavedRecord[]
}) => {
  const totalAmt = records.reduce((acc, cur) => {
    return acc + (+cur.contractAmountIntax.value);
  }, 0);
  
  return (
    <TableFooter>
      <TableRow>
        {/* Offset  3 columns */}
        <TableCell 
          colSpan={3}
          sx={{ 
            visibility: 'hidden', 
            border: '0px', // remove border
          }}
        />
        <TableCell 
          align='center'
          sx={{
            fontWeight: 'bold',
            border: '1px solid rgba(224, 224, 224, 1)', // reset border
            bgcolor: grey[200],
          }}
        >
          合計
        </TableCell>
        <TableCell 
          align='right' 
          sx={{
            fontSize: 14,
            whiteSpace: 'nowrap',
            color: grey[800],
            border: '1px solid rgba(224, 224, 224, 1)', // reset border
          }}
        >
          {totalAmt.toLocaleString()}
        </TableCell>
        
      </TableRow>
    </TableFooter>
  );
};