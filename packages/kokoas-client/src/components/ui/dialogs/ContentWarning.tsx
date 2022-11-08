import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import WarningIcon from '@mui/icons-material/Warning';
import { StackProps } from '@mui/system';

export const ContentWarning = ({
  content,
  ...stackProps
}: StackProps & {
  content: ReactNode
}) => {
  return (
    <Stack {...stackProps} spacing={2} justifyContent={'center'}>
      <Typography textAlign={'center'}>
        <WarningIcon
          fontSize={'large'}
          color="warning"
        />
      </Typography>
      <Typography textAlign={'center'}>
        {content}
      </Typography>
    </Stack>
  );

};