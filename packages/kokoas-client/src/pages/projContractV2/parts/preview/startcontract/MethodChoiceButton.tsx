import { Button, FormHelperText, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

export const MethodChoiceButton = ({
  mainLabel,
  secondaryLabel,
  handleClick,
  startIcon,
}: {
  mainLabel: string,
  secondaryLabel: string,
  handleClick?: () => void
  startIcon: ReactNode
}) => {
  return (
    <Button
      variant='outlined'
      onClick={handleClick}
      startIcon={startIcon}
      size='large'
      fullWidth
      sx={{
        justifyContent: 'flex-start',
        height: '100px',
      }}
    >
      <Stack ml={2}>
        <Typography
          variant="h6"
          color="text.primary"
          textAlign={'left'}
        >
          {mainLabel}
        </Typography>
        <FormHelperText>
          {secondaryLabel}
        </FormHelperText>
      </Stack>
    </Button>
  );
};