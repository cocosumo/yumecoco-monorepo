import { TableBody, TableCell, TableRow } from '@mui/material';
import { grey } from '@mui/material/colors';

export const ProspectBody = () => {
  return (
    <TableBody 
      sx={{
        //convert above to nth-of-type
        '& td:nth-of-type(2n):not(:last-of-type)': {
          borderRight: '4px double',
          borderColor: grey[300],

        },

        '& td:nth-of-type(2n+1)': {
          borderRight: '1px solid',
          borderColor: grey[300],

        },
        textAlign: 'center',
        
      }}
    >
      <TableRow>
        <TableCell>
          63件
        </TableCell>
        <TableCell>
          185,682,950		
        </TableCell>

        <TableCell>
          18件
        </TableCell>
        <TableCell>
          10,850,400
        </TableCell>

        <TableCell>
          53件
        </TableCell>
        <TableCell>
          65,006,000				
        </TableCell>
      </TableRow>
    </TableBody>
  );
};