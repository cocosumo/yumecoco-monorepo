import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { DialogCloseButton } from 'kokoas-client/src/components';
import { AlertDialogContent } from './AlertDialogContent';
import { useActiveUnissuedInvRemindersByProjId } from 'kokoas-client/src/hooksQuery';
import { useSaveReminder } from './hooks/useSaveReminder';
import { ChangeEvent, useState } from 'react';
import { KAlertPurpose, alertPurposes } from './alertConfig';
import { NotificationButton } from './NotificationButton';
import { useAlertNotification } from './hooks/useAlertNotification';



export const AlertDialog = async ({
  open,
  handleClose,
  projId,
}: {
  open: boolean
  handleClose: () => void
  projId: string
}) => {
  const [purpose, setPurpose] = useState('unissued' as KAlertPurpose);

  const { data: recUnissuedInvReminders } = useActiveUnissuedInvRemindersByProjId(projId);

  const handlePurposeChange = (e: ChangeEvent<HTMLInputElement>, value: KAlertPurpose) => {
    setPurpose(value);
  };

  const handleSave = useSaveReminder({
    projId,
    purpose,
  });

  const handleNotification =  useAlertNotification({
    projId,
    purpose,
  });

  const handleAlert = async () => {
    handleSave();
    handleNotification();
    handleClose();
  };

  const isDuplication = Boolean(recUnissuedInvReminders &&
    (recUnissuedInvReminders.some(({ alertType }) => alertPurposes[purpose] === alertType.value)));

  const duplicateExplanation = isDuplication ? '同アラートが既に設定されています' : '';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={'sm'}
      fullWidth
      PaperProps={{
        sx: {
          height: '50vh',
        },
      }}
    >
      <DialogTitle
        sx={{
          pb: 1,
          display: 'relative',
        }}
      >
        担当者へ請求書の発行要求を通知します
      </DialogTitle>

      <AlertDialogContent
        purpose={purpose}
        handlePurposeChange={handlePurposeChange}
        projId={projId}
      />

      <DialogCloseButton handleClose={handleClose} />
      <DialogActions>
        <Button onClick={handleClose}>
          キャンセル
        </Button>
        <NotificationButton
          explanation={duplicateExplanation}
          handleAlert={handleAlert}
          isDuplication={isDuplication}
        />
      </DialogActions>

    </Dialog>);

};
