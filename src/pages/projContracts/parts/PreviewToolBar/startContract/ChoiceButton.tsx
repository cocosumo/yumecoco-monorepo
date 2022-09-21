import { Button, FormHelperText, Paper, Stack, Typography } from '@mui/material';

export const ChoiceButton = ({
  mainLabel,
  secondaryLabel,
}: {
  mainLabel: string,
  secondaryLabel: string,
}) => {
  return (
    <Button
      variant='outlined'
    >
      <Stack
        direction={'column'}
        alignItems={'flex-start'}
        maxWidth={'300px'}
      >
        <Typography
          sx={{ display: 'inline' }}
          component="span"
          variant="h6"
          color="text.primary"
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