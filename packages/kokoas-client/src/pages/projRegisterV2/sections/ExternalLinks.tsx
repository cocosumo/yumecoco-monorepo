import { Avatar, Chip, Stack } from '@mui/material';
import { AndpadLogo } from 'kokoas-client/src/components/ui/icons';
import Grid from '@mui/material/Unstable_Grid2';


import { useTypedWatch } from '../hooks/useTypedRHF';
export const ExternalLinks = () => {
  const systemId = useTypedWatch({
    name: 'andpadDetails.システムID',
  });


  return (
    <Grid xs={'auto'}>
      <Stack direction={'row'}>
        {systemId && (
         
        <Chip
          avatar={<Avatar
            sx={{
              bgcolor: 'red',
            }}
                  >
            <AndpadLogo />
          </Avatar>}
          label={systemId as string}
          component={'a'}
          href={`https://andpad.jp/my/orders/${systemId}`}
          target={'_blank'}
          title='Andpadで見る'
        />
      
        )}
        
      </Stack>

    </Grid>
  );
};