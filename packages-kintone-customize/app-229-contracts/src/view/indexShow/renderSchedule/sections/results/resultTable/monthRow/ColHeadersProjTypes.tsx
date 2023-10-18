import { TableCell, TableRow } from '@mui/material';
import { projTypesToShow } from '../../../../config';

export const ColHeaderProjTypes = () => {
  
  return (
    <TableRow 
      sx={{
        '& > th': {
          fontSize: 10,
          width: 80,
          px: 0.5,
        },
      }}
    >
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
        
      <TableCell align='center' 
        sx={{
          '& > span':{
            fontSize: 8,
          },
        }}
      >
        <span>
          その他(造成・外構等)		

        </span>
      </TableCell>
        
    </TableRow>
  );
};