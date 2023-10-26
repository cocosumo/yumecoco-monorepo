import { Divider, TableCell, Typography } from '@mui/material';
import { yellow } from '@mui/material/colors';
import { Stack } from '@mui/system';
import { roundTo } from 'libs';
import styles from './ExpensesCell.module.css';

export const ExpensesCell = ({
  label,
  expenseAmt,
}:{
  label: string;
  expenseAmt: number;
}) => {
  return (
    <TableCell
      sx={{
        p: 0,
        '&&':{
          border: '2px solid black',
        },
      }}
    >
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        divider={<Divider orientation={'vertical'} flexItem />}
      >
        <Typography 
          p={1}
          fontSize={12}
          className={styles.label}

        >
          {label}

        </Typography>
        <Typography 
          p={1}
          textAlign={'right'}
          fontSize={20}
          fontWeight={'bold'}
          bgcolor={yellow.A200}
          width={'100%'}
          className={styles.expenseAmt}
        >
          {roundTo(expenseAmt).toLocaleString()}
          万円
        </Typography>

      </Stack>
    </TableCell>
  );
};