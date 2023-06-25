import { Stack } from '@mui/material';
import { CopyPastProjLocation } from './CopyPastProjLocation';
import { CopyCustLocation } from './CopyCustLocation';

export const CopyLocation = () => {
  return (
    <Stack direction={'row'} spacing={2}>

      <CopyPastProjLocation />
      
      <CopyCustLocation />

    </Stack>

  );
};