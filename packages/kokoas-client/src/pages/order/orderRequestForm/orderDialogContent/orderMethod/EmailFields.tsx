import { Stack } from '@mui/material';
import { CustomEmailField } from './CustomTextField';

export const EmailFields = () => {
  return (
    <Stack
      spacing={2}
      direction={'row'}
    >
      <CustomEmailField label="宛先" required />
      <CustomEmailField label="CC" />
      <CustomEmailField label="BCC" />

    </Stack>
  );
};