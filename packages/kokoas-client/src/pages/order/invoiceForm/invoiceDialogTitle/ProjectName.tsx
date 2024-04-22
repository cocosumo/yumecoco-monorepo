import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { useProjById } from 'kokoas-client/src/hooksQuery';

export const ProjectName = () => {
  const projId = useTypedWatch({
    name: 'projId',
  }) as string;
  const { data } = useProjById(projId);

  return (
    <Typography 
      fontSize={'inherit'} 
      component={'span'} 
      color={grey[600]}
    >
      {data?.projName.value}
    </Typography>
  );
};