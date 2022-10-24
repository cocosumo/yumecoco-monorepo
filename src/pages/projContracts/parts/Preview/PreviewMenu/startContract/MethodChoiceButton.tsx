import { Button, FormHelperText, Stack, Typography } from '@mui/material';

export const MethodChoiceButton = ({
  mainLabel,
  secondaryLabel,
  handleClick,
}: {
  mainLabel: string,
  secondaryLabel: string,
  handleClick: () => void
}) => {
  return (
    <Button
      variant='outlined'
      onClick={handleClick}
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