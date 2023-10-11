import { Stack } from '@mui/material';

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
      <PTCommRateByEmployee />

      <PTCommRateByRole />

      <PTCommisionRate />

      <PTProfitRate />

    </Stack>
  );
};