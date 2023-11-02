import { TableCell, TableRow } from '@mui/material';
import { projTypesToShow } from '../../../../config';
import styles from './ColHeaderProjTypes.module.css';


export const ColHeaderProjTypes = () => {
  
  return (
    <TableRow>
      {
        projTypesToShow.map(({ id, name }) => {
          return (
            <TableCell 
              width={40}
              key={id}
              align='center'
              className={styles.cell}
            >
              {name}
            </TableCell>);
        })
      }
        
      <TableCell align='center' 
        sx={{
          fontSize: 9,
        }}
        className={styles.others}
      >
        その他(造成・外構等)		

      </TableCell>
        
    </TableRow>
  );
};