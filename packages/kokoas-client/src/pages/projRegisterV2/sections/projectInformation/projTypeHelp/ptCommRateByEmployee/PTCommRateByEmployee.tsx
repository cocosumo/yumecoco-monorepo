import { Stack, Typography } from '@mui/material';
import { useTypedWatch } from '../../../../hooks';
import { TForm } from '../../../../schema';
import { Content } from './Content';

export const PTCommRateByEmployee = () => {

  const commRateByEmployee = useTypedWatch({
    name: 'commRateByEmployee',
  }) as TForm['commRateByEmployee'];

  if (!commRateByEmployee.length) return null;

  return (
    <Stack>
      <Typography fontWeight={'bold'}>
        個別紹介料率
      </Typography>

      <Content data={commRateByEmployee} />
      
    </Stack>
  );
};