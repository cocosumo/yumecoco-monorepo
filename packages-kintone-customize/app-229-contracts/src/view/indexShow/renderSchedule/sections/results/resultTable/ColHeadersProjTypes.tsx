import { TableCell, TableRow } from '@mui/material';
import { projTypesToShow } from '../../../config';

export const ColHeaderProjTypes = () => {
  
  return (
    <TableRow>
      {
        projTypesToShow.map(({ id, name }) => {
          return (
            <TableCell 
              key={id}
              align='center'
            >
              {name}
            </TableCell>);
        })
      }
        
      <TableCell align='center' >
        その他(造成・外構等)		
      </TableCell>
        
    </TableRow>
  );
};