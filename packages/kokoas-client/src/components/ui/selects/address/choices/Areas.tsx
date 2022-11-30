import { ComponentProps } from 'react';
import { LocationChoices } from '../common/LocationChoices';
import JapanMap from 'kokoas-client/src/assets/img_area_map.gif';
import { Box, Paper } from '@mui/material';

export const Areas = (
  props: Omit<ComponentProps<typeof LocationChoices>, 'choices'>,
) => {


  return (
    <Box sx={{
      background: `url(${JapanMap}) center no-repeat #fff`,
      height: '445px',
    }}
    >
    
    </Box>
   
  );
};