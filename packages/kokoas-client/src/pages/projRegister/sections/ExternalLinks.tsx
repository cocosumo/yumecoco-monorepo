import { Avatar, Chip, Grid, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { AndpadLogo } from 'kokoas-client/src/components/ui/icons';
import { TypeOfForm } from '../form';

export const ExternalLinks = () => {
  const { values: {
    andpadDetails,
  } } = useFormikContext<TypeOfForm>();

  const {
    システムID: systemId,
  } = andpadDetails || {};

  return (
    <Grid item xs={12}>
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
          label={systemId}
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