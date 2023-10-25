import { Stack, TableCell, Typography } from '@mui/material';
import { ExpensesByMonth } from '../../../../hooks/useTargetData';
import { yellow } from '@mui/material/colors';

export const MonthlyOtherExpenses = ({
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
        height: '100px', // これがないと、月別の行の高さが揃わない
        p: 0,
      }}
    >
      <Stack
        justifyContent={'space-between'}
        height={'100%'}
       
      >
        <Stack
          spacing={1}
          p={1}
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
        >
          {(totalExpenses || 0).toLocaleString()}
          万円
        </Typography>

      </Stack>
    </TableCell>
  );
  
};