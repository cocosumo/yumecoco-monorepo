import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import { DialogCloseButton } from 'kokoas-client/src/components';
import { AlertDialogContent } from './AlertDialogContent';
import { useSaveReminder } from './hooks/useSaveReminder';
import { ChangeEvent, useState } from 'react';
import { KAlertPurpose, alertPurposes } from './alertConfig';
import { NotificationButton } from './NotificationButton';
import { useActiveUnissuedInvRemindersByProjId } from './hooks/useActiveUnissuedInvRemindersByProjId';
import { useAlertNotify } from './hooks/useAlertNotify';
import { convertToHalfWidth } from 'libs';



export const AlertDialog = ({
  open,
  handleClose,
  projId,
}: {
  open: boolean
  handleClose: () => void
  projId: string
}) => {
  const [purpose, setPurpose] = useState('unissued' as KAlertPurpose);
  const [paymentDate, setPaymentDate] = useState<Date | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<string>('0');

  const handleDateChange = (value: Date) => {
    setPaymentDate(value);
  };

  const handleAmtChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    const numVal = convertToHalfWidth(newVal);

    if (!isNaN(+numVal)) {
      setPaymentAmount(numVal);
    } else {
      setPaymentAmount(newVal);
    }

  };

  const recUnissuedInvReminders = useActiveUnissuedInvRemindersByProjId(projId);

  const handlePurposeChange = (e: ChangeEvent<HTMLInputElement>, value: KAlertPurpose) => {
    setPurpose(value);
  };

  const {
    saveReminder,
    isLoadingSaveReminder,
  } = useSaveReminder({
    projId,
    purpose,
    paymentDate,
    paymentAmount,
  });

  const {
    alertNotify,
    isLoadingAlertNotify,
  } = useAlertNotify({
    projId,
    purpose,
  });

  const isLoading = isLoadingSaveReminder || isLoadingAlertNotify;

  const handleAlert = async () => {
    const saveRec = await saveReminder();
    if (!saveRec) return;
    alertNotify(saveRec.id, paymentDate);
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
        handleDateChange={handleDateChange}
        handleAmtChange={handleAmtChange}
        projId={projId}
        paymentDate={paymentDate}
        paymentAmount={paymentAmount}
      />

      <DialogCloseButton handleClose={handleClose} />
      <DialogActions>
        {!isLoading && <>
          <Button onClick={handleClose}>
            キャンセル
          </Button>
          <NotificationButton
            explanation={duplicateExplanation}
            handleAlert={handleAlert}
            isDuplication={isDuplication}
          />
        </>}
        {isLoading && <Typography>
          データ読み込み中です。しばらくお待ちください。
        </Typography>}
      </DialogActions>

    </Dialog>);

};
