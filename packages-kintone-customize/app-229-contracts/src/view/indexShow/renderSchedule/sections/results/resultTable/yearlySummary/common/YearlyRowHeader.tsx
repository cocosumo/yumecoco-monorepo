import { TableCell } from '@mui/material';
import styles from './YearlyRowHeader.module.css';
export const YearlyRowHeader = ({
  label,
}:{ 
  label: string
}) => {
  return (
    <TableCell 
      colSpan={3} 
      align='center'
      className={styles.cell}
      sx={{
        fontSize: 20,
        '&&': {
          borderLeft: '2px solid #333',
          borderTop: '2px solid #333',
          borderBottom: '2px solid #333',
        },

      }}
    >
      {label}
    </TableCell>
  );
};