import { Stack, Typography } from '@mui/material';
import { useTypedWatch } from '../../../hooks';
import { TForm } from '../../../schema';
import { useProjTypeById } from 'kokoas-client/src/hooksQuery';

export const PTProfitRate = () => {
  const projTypeId = useTypedWatch({
    name: 'projTypeId',
  }) as TForm['projTypeId'];

  const { data } = useProjTypeById(projTypeId);

  const {
    profitRate,
  } = data || {};

  return (
    <Stack
      justifyContent={'space-between'}
      direction={'row'}
    >
      <Typography>
        利益率：
      </Typography>
      <Typography>
        {Number(profitRate?.value || 0)}
        %
      </Typography>

    </Stack>

  );
};