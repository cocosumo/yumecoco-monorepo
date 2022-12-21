import { Stack, Tooltip, Typography } from '@mui/material';
import { ComponentProps } from 'react';
import KeyboardIcon from '@mui/icons-material/Keyboard';

export const HotKeyTooltip = (
  {
    title,
    ...others
  }: ComponentProps<typeof Tooltip>,
) => {

  return (
    <Tooltip
      {...others}
      enterDelay={1500}
      title={(
        <Stack direction={'row'} spacing={2}>
          <KeyboardIcon />
          <Typography>
            {title}
          </Typography>
        </Stack>
     )}
    />

  );
};