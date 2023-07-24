import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ReactNode } from 'react';

export const Title = ({
  content,
}:{
  content: ReactNode
}) => {
  return (
 
    <Typography variant="h5" color={grey[700]}>
      {content}
    </Typography>

  );
};