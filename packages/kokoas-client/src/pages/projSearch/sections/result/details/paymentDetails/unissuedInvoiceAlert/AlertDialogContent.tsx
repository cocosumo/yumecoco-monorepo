import { DialogContent, Stack } from '@mui/material';
import { AlertPurposeRadio } from './AlertPurposeRadio';
import { AlertContent } from './AlertContent';
import { AlertTarget } from './AlertTarget';
import { KAlertPurpose } from './alertConfig';
import { ChangeEvent } from 'react';
import { useProjById } from 'kokoas-client/src/hooksQuery';

export const AlertDialogContent = ({
  purpose,
  handlePurposeChange,
  handleDateChange,
  projId,
  paymentDate,
}: {
  purpose: KAlertPurpose
  handlePurposeChange: (e: ChangeEvent<HTMLInputElement>, value: KAlertPurpose) => void
  handleDateChange: (v: Date) => void
  projId: string
  paymentDate: Date | null
}) => {

  const { data: recProj } = useProjById(projId);

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

        <AlertContent
          purpose={purpose}
          handleDateChange={handleDateChange}
          paymentDate={paymentDate}
        />

        <AlertTarget agents={recProj?.agents} />

      </Stack>
    </DialogContent>);
};
