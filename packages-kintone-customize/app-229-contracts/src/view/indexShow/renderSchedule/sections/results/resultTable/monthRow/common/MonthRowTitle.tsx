import { TableCell } from '@mui/material';
import styles from './MonthRowTitle.module.css';

export const MonthRowTitle = ({
  label,
}:{
  label: string;
}) => {
  return (
    <TableCell 
      sx={{
        fontSize: 14,
      }}
      className={styles.monthRowTitle}
    >
      {label}
    </TableCell>
  );
};