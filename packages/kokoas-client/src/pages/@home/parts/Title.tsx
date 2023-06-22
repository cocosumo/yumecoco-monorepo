import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

export const Title = () => {
  return (
    <Stack
      direction={'row'} 
      spacing={2}
    >
      <Typography variant="h4" color={grey[700]}>
        アップデート情報
      </Typography>

    </Stack>
  );
};