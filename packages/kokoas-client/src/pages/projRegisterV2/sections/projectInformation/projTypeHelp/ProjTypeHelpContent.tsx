import { Stack, Typography } from '@mui/material';

import { PTCommRateByEmployee } from './ptCommRateByEmployee/PTCommRateByEmployee';
import { PTCommRateByRole } from './ptCommRateByRole/PTCommRateByRole';
import { PTCommisionRate } from './PTCommisionRate';
import { PTProfitRate } from './PTProfitRate';

export const ProjTypeHelpContent = () => {


  return (
    <Stack 
      spacing={1}
      minWidth={'120px'}
    >
      <Typography fontSize={16}>
        最新設定
      </Typography>
      <PTCommRateByEmployee />

      <PTCommRateByRole />

      <PTCommisionRate />

      <PTProfitRate />

    </Stack>
  );
};