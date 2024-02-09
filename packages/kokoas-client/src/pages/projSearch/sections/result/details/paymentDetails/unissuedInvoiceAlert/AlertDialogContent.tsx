import { DialogContent, Stack } from '@mui/material';
import { AlertPurposeRadio } from './AlertPurposeRadio';
import { AlertContent } from './AlertContent';
import { AlertTarget } from './AlertTarget';
import { IProjects } from 'types';
import { KAlertPurpose } from './alertConfig';
import { ChangeEvent } from 'react';

export const AlertDialogContent = ({
  purpose,
  handlePurposeChange,
  agents,
}: {
  purpose: KAlertPurpose
  handlePurposeChange: (e: ChangeEvent<HTMLInputElement>, value: KAlertPurpose) => void
  agents: IProjects['agents'] | undefined
}) => {

  return (
    <DialogContent
      dividers
      sx={{
        height: '80vh',
        overflow: 'hidden',
        p: 0,
      }}
    >
      <Stack
        direction={'column'}
        spacing={2}
        p={2}
      >
        <AlertPurposeRadio
          value={purpose}
          handleChange={handlePurposeChange}
        />

        <AlertContent purpose={purpose} />

        <AlertTarget agents={agents} />

      </Stack>
    </DialogContent>);
};
