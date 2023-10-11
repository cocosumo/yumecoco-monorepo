import { Stack, Typography } from '@mui/material';
import { useTypedWatch } from '../../../hooks';
import { TForm } from '../../../schema';

export const PTCommisionRate = () => {
  const commissionRate = useTypedWatch({
    name: 'commissionRate',
  }) as TForm['commissionRate'];

  return (
    <Stack
      justifyContent={'space-between'}
      direction={'row'}
    >
      <Typography>
        規定紹介料率：
      </Typography>
      <Typography>
        {commissionRate}
        %
      </Typography>

    </Stack>

  );
};