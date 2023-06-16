
import { Box, Typography } from '@mui/material';
import { ComponentProps } from 'react';
import { grey } from '@mui/material/colors';



export const EmptyBox = (props: ComponentProps<typeof Box>) => {
  const { children, ...others } = props;

  return (
    <Box
      {...others}
      sx={{
        width: '100%',
        border: `2px dashed ${grey[300]}`,
        borderRadius: '10px',
        padding: '8px',
        display: 'flex',
        alignItems: 'center', // Center vertically
        justifyContent: 'center', // Center horizontally
      }}
    >
      <Typography variant="h6" textAlign={'center'} color={grey[600]}>
        {children}
      </Typography>

    </Box>

  );
};