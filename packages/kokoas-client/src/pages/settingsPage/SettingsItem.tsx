import {  Button, Stack, Typography } from '@mui/material';

export const SettingsItem = ({
  settingsName,
  settingsDescription,
  link,
}: {
  settingsName: string,
  settingsDescription: string,
  link: string,
}) => {

  return (

    <Button
      fullWidth
      variant={'outlined'}
      color={'secondary'}
      sx={{
        minHeight: '8vw',
      }}
      href={link} target={'_blank'}
    >
      <Stack justifyContent={'left'} width={'100%'}>
        <Typography fontSize={20} fontWeight={800}>
          {settingsName}
        </Typography>
        <Typography fontSize={14}>
          {settingsDescription}
        </Typography>
      </Stack>

    </Button>


  );
};