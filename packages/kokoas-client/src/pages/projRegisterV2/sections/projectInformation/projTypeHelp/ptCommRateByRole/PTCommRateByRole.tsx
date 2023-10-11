import { Stack, Typography } from '@mui/material';
import { useTypedWatch } from '../../../../hooks';
import { TForm } from '../../../../schema';
import { Content } from './Content';

export const PTCommRateByRole = () => {

  const commRateByRole = useTypedWatch({
    name: 'commRateByRole',
  }) as TForm['commRateByRole'];

  if (!commRateByRole.length) return null;

  return (
    <Stack>
      <Typography fontWeight={'bold'}>
        役職別紹介料率
      </Typography>
      
      <Content data={commRateByRole} />
      
    </Stack>
  );
};