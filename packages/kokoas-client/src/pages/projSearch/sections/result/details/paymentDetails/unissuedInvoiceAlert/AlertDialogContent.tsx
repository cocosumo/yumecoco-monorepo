import { DialogContent, Stack } from '@mui/material';
import { AlertPurposeRadio } from './AlertPurposeRadio';
import { AlertTarget } from './AlertTarget';
import { KAlertPurpose } from './alertConfig';
import { ChangeEvent, ChangeEventHandler } from 'react';
import { useProjById } from 'kokoas-client/src/hooksQuery';
import { AlertContent } from './alertContent/AlertContent';

export const AlertDialogContent = ({
  purpose,
  handlePurposeChange,
  handleDateChange,
  handleAmtChange,
  projId,
  paymentDate,
  paymentAmount,
}: {
  purpose: KAlertPurpose
  handlePurposeChange: (e: ChangeEvent<HTMLInputElement>, value: KAlertPurpose) => void
  handleDateChange: (v: Date) => void
  handleAmtChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  projId: string
  paymentDate: Date | null
  paymentAmount: number
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
          handleAmtChange={handleAmtChange}
          paymentAmount={paymentAmount}
        />

        <AlertTarget agents={recProj?.agents} />

      </Stack>
    </DialogContent>);
};
