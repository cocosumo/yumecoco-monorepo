import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import WarningIcon from '@mui/icons-material/Warning';

export const ContentWarning = ({
  content,
}: {
  content: ReactNode
}) => {
  return (
    <Stack>
      <Typography textAlign={'center'}>
        <WarningIcon
          fontSize={'large'}
          color="warning"
        />
      </Typography>
      <Typography>
        {content}
      </Typography>
    </Stack>
  );

};