import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useProjById } from 'kokoas-client/src/hooksQuery';
import { useInvoiceWatch } from '../hooks/useInvoiceRHF';

export const ProjectName = () => {
  const projId = useInvoiceWatch({
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