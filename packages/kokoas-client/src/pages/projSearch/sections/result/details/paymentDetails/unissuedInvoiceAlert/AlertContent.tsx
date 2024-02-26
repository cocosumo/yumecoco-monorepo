import { Stack, Typography } from '@mui/material';
import { KAlertPurpose, alertMessages } from './alertConfig';

export const AlertContent = ({
  purpose,
}: {
  purpose: KAlertPurpose
}) => {


  return (
    <Stack 
      direction={'column'}
      spacing={1}
    >
      <Typography
        variant='body2'
        sx={{
          color: 'gray',
        }}
      >
        通知内容 :
      </Typography>

      <Typography
        variant='body1'
        sx={{
          pl: '10px',
        }}
      >
        {alertMessages[purpose]}
      </Typography>
    </Stack>
  );
};
