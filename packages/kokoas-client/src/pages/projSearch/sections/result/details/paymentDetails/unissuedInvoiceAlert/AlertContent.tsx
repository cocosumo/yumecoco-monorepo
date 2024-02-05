import { Box, Typography } from '@mui/material';
import { KAlertPurpose, alertMessages } from './alertConfig';

export const AlertContent = ({
  purpose,
}: {
  purpose: KAlertPurpose
}) => {


  return (
    <>
      <Typography variant='body2'>
        通知内容
      </Typography>
      <Box
        component="section"
        sx={{
          p: 2,
          border: '1px solid grey',
          borderRadius: 1,
        }}
      >

        <Typography variant='body2'>
          {alertMessages[purpose]}
        </Typography>

      </Box>
    </>
  );
};
