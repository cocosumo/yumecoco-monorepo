import { Box, Divider, Stack } from '@mui/material';
import { Title } from './parts/Title';
import { OtherMenu } from './otherMenu/OtherMenu';
import { CompletedTickets } from './sections/completedTickets/CompletedTickets';
import { NewContracts } from './sections/newContracts/NewContracts';

export const Home = () => {
  return (
    <Box sx={{ 
      display: 'flex' }}
    >
      <Stack 
        spacing={2}
        sx={{
          flexGrow: 1,
        }}
        pb={8}
      >
        <Title content={'アップデート情報'} />
        <CompletedTickets />

        <Divider />

        <Title content={'最新契約'} />
        <NewContracts />


      </Stack>
      <OtherMenu />
    </Box>

  );
};