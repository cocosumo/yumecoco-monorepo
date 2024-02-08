import { DialogContent, Stack } from '@mui/material';
import { AlertPurposeRadio } from './AlertPurposeRadio';
import { ChangeEvent, useState } from 'react';
import { KAlertPurpose } from './alertConfig';
import { AlertContent } from './AlertContent';
import { AlertTarget } from './AlertTarget';
import { IProjects } from 'types';

export const AlertDialogContent = ({
  agents,
}: {
  agents: IProjects['agents'] | undefined
}) => {
  const [purpose, setPurpose] = useState('unissued' as KAlertPurpose);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, value: KAlertPurpose) => {
    setPurpose(value);
  };

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
          handleChange={handleChange}
        />

        <AlertContent purpose={purpose} />

        <AlertTarget agents={agents} />

      </Stack>
    </DialogContent>);
};
