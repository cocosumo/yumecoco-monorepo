import { useWatch } from 'react-hook-form';
import { useOrderFormContext } from '../hooks/useOrderRHF';
import { Typography } from '@mui/material';

export const ProjectName = () => {
  const { control } = useOrderFormContext();
  const projName = useWatch({
    control,
    name: 'projName',
  });


  return (
    <Typography fontSize={'inherit'} component={'span'}>
      {projName}
    </Typography>
  );
};