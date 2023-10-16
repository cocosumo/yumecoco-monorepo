import { CircularProgress, Stack, Typography } from '@mui/material';

export const LastBillingLabel = ({
  isLoading,
  lastBillingDate,
}:{
  isLoading: boolean,
  lastBillingDate: string,
}) => {
  
  return (
    <Stack
      direction={'row'}
      spacing={2}
    >
      <Typography>
        最終請求日
      </Typography>

      <Typography>
        {lastBillingDate}
      </Typography>

      {isLoading && <CircularProgress size={16} />}


    </Stack>
  );
};