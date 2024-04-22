import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

export const ProjectName = () => {
  

  return (
    <Typography 
      fontSize={'inherit'} 
      component={'span'} 
      color={grey[600]}
    >
      山田太郎豪邸 新築付帯
    </Typography>
  );
};