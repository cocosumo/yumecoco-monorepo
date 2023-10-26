import { Stack, TableCell, Typography } from '@mui/material';
import { ExpensesByMonth } from '../../../../hooks/useTargetData';
import { yellow } from '@mui/material/colors';
import styles from './MonthAds.module.css';

export const MonthAds = ({
  data,
}:{ 
  data: ExpensesByMonth[number] | undefined,
}) => {

  const {
    expenses,
    totalExpenses,
  } = data ?? {};

  return (
    <TableCell 
      rowSpan={3}
      sx={{
        height: '0px',
        p: 0,
      }}
      className={styles.printText}
    >
      <Stack
        justifyContent={'space-between'}
        height={'100%'}
       
      >
        <Stack
          spacing={1}
          p={1}
          className={styles.container}
        >
          {expenses?.map(({
            description,
            id,
          }) => {

            return (
              <div key={id}>
                {description}
              </div>
            );
          }) }
        </Stack>

        <Typography
          px={1}
          bgcolor={yellow[100]}
          textAlign={'right'}
          fontSize={14}
          component={'div'}
        >
          {(totalExpenses || 0).toLocaleString()}
          万円
        </Typography>

      </Stack>
    </TableCell>
  );
  
};