import { TableCell } from '@mui/material';
import { grey } from '@mui/material/colors';
import styles from './MonthHeader.module.css';
export const MonthHeader = ({
  month,
}:{
  month: number;
}) => {
  return (
    <TableCell 
      component={'th'} 
      align='center' 
      rowSpan={3}
      sx={{
        color: grey[700],
        whiteSpace: 'nowrap',
      }}
      className={styles.headerCell}
    >
      {month}
      月
    </TableCell>
  );
};