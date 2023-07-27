import { Box, Stack } from '@mui/material';
import { Title } from './parts/Title';
import { OtherMenu } from './otherMenu/OtherMenu';
import { CompletedTickets } from './sections/completedTickets/CompletedTickets';
import { Suggestions } from './sections/completedTickets/Suggestions';

export const Home = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Stack 
        spacing={2}
        sx={{
          flexGrow: 1,
          height: '50vh',
        }}
      >
        <Title />
        <CompletedTickets />
        <Suggestions />
      </Stack>
      <OtherMenu />
    </Box>

  );
};