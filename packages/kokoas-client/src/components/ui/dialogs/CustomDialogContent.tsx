import { Stack, SxProps, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import { ReactNode } from 'react';
type TSeverity = 'warning' | 'danger' | 'info';

const ContentIcon = ({
  severity, sx,
}: {
  severity: TSeverity
  sx?: SxProps,
}) => {
  switch (severity) {
    case 'warning':
      return <WarningIcon color='warning' sx={sx} />;
    case 'danger':
      return <ErrorIcon color='error' sx={sx} />;
    case 'info':
      return <InfoIcon color='info' sx={sx} />;
  }
};

export const CustomDialogContent = (
  {
    message,
    severity,
  }: {
    severity: TSeverity
    message: ReactNode
  },
) => {

  return (
    <Stack spacing={2} justifyContent={'center'}>
      <Typography textAlign="center" variant="body1">
        <ContentIcon severity={severity} />
        <br />
        {message}
      </Typography>
    </Stack>
  );


};