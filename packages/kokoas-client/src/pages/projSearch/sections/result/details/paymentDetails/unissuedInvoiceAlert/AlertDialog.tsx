import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { DialogCloseButton } from 'kokoas-client/src/components';
import { AlertDialogContent } from './AlertDialogContent';
import { useContractsByProjIdV2, useEmployees, useProjById } from 'kokoas-client/src/hooksQuery';
import { IContracts, IEmployees, IProjects } from 'types';
import { useSaveReminder } from './saveReminder/hooks/useSaveReminder';
import { ChangeEvent, useState } from 'react';
import { KAlertPurpose } from './alertConfig';

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

  const handlePurposeChange = (e: ChangeEvent<HTMLInputElement>, value: KAlertPurpose) => {
    setPurpose(value);
  };

  const { data: recProj } = useProjById(projId);
  const { data: recContracts } = useContractsByProjIdV2(projId);
  const { data: recEmployees } = useEmployees();

  const handleSave = useSaveReminder({
    recProj: recProj || {} as IProjects,
    recContracts: recContracts || [] as IContracts[],
    recEmployees: recEmployees || [] as IEmployees[],
    purpose,
  });

  const handleAlert = () => {
    // 既に同内容でリマインダー登録されていないか確認する
    // 登録されていたら、メッセージを表示し、終了する

    handleSave();

    // TODO アラート通知処理
    handleClose();

  };


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
        agents={recProj?.agents}
      />

      <DialogCloseButton handleClose={handleClose} />
      <DialogActions>
        <Button onClick={handleClose}>
          キャンセル
        </Button>
        <Button onClick={handleAlert} autoFocus>
          chatworkに送信
        </Button>
      </DialogActions>

    </Dialog>);

};
