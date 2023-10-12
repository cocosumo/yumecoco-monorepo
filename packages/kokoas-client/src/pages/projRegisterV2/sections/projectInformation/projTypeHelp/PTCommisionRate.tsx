import { Stack, Typography } from '@mui/material';
import { useTypedWatch } from '../../../hooks';
import { TForm } from '../../../schema';
import { useProjTypeById } from 'kokoas-client/src/hooksQuery';

export const PTCommisionRate = () => {
  const projTypeId = useTypedWatch({
    name: 'projTypeId',
  }) as TForm['projTypeId'];

  const { data } = useProjTypeById(projTypeId);

  const {
    yumeCommFeeRate,
  } = data || {};

  return (
    <Stack
      justifyContent={'space-between'}
      direction={'row'}
    >
      <Typography>
        ゆめてつ紹介料率：
      </Typography>
      <Typography>
        {Number(yumeCommFeeRate?.value || 0)}
        %
      </Typography>

    </Stack>

  );
};