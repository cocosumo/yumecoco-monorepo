import { Stack, Typography } from '@mui/material';
import { useTypedWatch } from '../../../hooks';
import { TForm } from '../../../schema';

export const PTProfitRate = () => {
  const profitRate = useTypedWatch({
    name: 'profitRate',
  }) as TForm['profitRate'];

  return (
    <Stack
      justifyContent={'space-between'}
      direction={'row'}
    >
      <Typography>
        利益率：
      </Typography>
      <Typography>
        {profitRate}
        %
      </Typography>

    </Stack>

  );
};