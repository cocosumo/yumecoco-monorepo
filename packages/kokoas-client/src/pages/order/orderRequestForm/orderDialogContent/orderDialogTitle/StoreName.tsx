import { useWatch } from 'react-hook-form';
import { useOrderFormContext } from '../../hooks/useOrderRHF';
import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

export const StoreName = () => {
  const { control } = useOrderFormContext();
  const storeName = useWatch({
    control,
    name: 'storeName',
  });


  return (
    <Typography fontSize={12} color={grey[600]} component={'span'}>
      {storeName}
    </Typography>
  );
};