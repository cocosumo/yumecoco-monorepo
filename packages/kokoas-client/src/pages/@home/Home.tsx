import { Box, Stack } from '@mui/material';
import { Title } from './parts/Title';
import { OtherMenu } from './otherMenu/OtherMenu';
import { CompletedTickets } from './sections/completedTickets/CompletedTickets';

export const Home = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Stack 
        spacing={2}
        sx={{
          flexGrow: 1,
        }}
      >
        <Title />
        <CompletedTickets />
        
      </Stack>
      <OtherMenu />
    </Box>

  );
};