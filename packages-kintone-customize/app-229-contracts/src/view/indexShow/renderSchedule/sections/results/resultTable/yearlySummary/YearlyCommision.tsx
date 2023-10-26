import { Fragment } from 'react';
import { BorderlessCell } from './common/BorderlessCell';
import { TableCell, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { roundTo } from 'libs';
import styles from './YearlyCommision.module.css';

export const YearlyCommision = ({
  amount,
  bgColor = blue[50],
  label,
}:{
  amount: number
  label: string
  bgColor?: string
}) => {
  return (
    <Fragment>
      <BorderlessCell 
        align='right'
        sx={{
          fontWeight: 'bold',
          fontSize: 18,
        }}
        colSpan={2}
        className={styles.label}
      >
        {label}
      </BorderlessCell>
      <TableCell
        sx={{
          bgcolor: bgColor,
          fontWeight: 'bold',
          fontSize: 20,
          '&&':{
            border: '2px solid black',
          },
        }}
        align='right'
        className={styles.expenseAmt}
      >
        {roundTo(amount / 10000).toLocaleString()} 
        <Typography 
          variant='caption' 
          color={grey[700]}
          ml={0.5}
          className={styles.suffix}
          component={'span'}
        >
          万円
        </Typography>
      </TableCell>
      
    </Fragment>
  );
};