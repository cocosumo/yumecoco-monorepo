import { TableBody, TableCell, TableRow } from '@mui/material';
import { grey } from '@mui/material/colors';

export const ProspectBody = () => {
  return (
    <TableBody 
      sx={{
        // apply thick border to every 2nd cell, exept the last one
        '& td:nth-child(2n):not(:last-child)': {
          borderRight: '4px double',
          borderColor: grey[300],

        },
        // apply a thin border to every 1st cell
        '& td:nth-child(2n+1)': {
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