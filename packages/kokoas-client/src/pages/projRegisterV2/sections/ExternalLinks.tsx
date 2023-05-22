import { Avatar, Chip, Stack } from '@mui/material';
import { AndpadLogo } from 'kokoas-client/src/components/ui/icons';
import { TypeOfForm } from '../form';
import { useWatch } from 'react-hook-form';
import Grid from '@mui/material/Unstable_Grid2';


export const ExternalLinks = () => {
  const systemId = useWatch<TypeOfForm>({
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