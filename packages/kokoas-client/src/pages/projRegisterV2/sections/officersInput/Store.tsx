import { Stack, Typography } from '@mui/material';
import { useTypedWatch } from '../../hooks';
import { TForm } from '../../schema';
import { grey } from '@mui/material/colors';

export const Store = () => {

  const [
    storeName,
    territory,
  ] = useTypedWatch({
    name: [
      'storeName',
      'territory',
    ],
  }) as Array<TForm['storeName'] | TForm['territory']>; 

  return (
    <Stack
      direction={'row'}
      spacing={1}
    >
      <Typography
        color={grey[500]}
      >
        {territory}
      </Typography>
      <Typography
        fontWeight={'bold'}
        color={grey[700]}
      >
        {storeName}
      </Typography>

    </Stack>
  );
};