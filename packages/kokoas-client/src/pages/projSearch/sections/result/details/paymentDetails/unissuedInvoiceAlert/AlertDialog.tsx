import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import { DialogCloseButton } from 'kokoas-client/src/components';
import { AlertDialogContent } from './AlertDialogContent';
import { useContractsByProjIdV2, useEmployees, useProjById } from 'kokoas-client/src/hooksQuery';
import { IContracts, IEmployees, IProjects } from 'types';
import { useSaveReminder } from './saveReminder/hooks/useSaveReminder';

export const AlertDialog = ({
  open,
  handleClose,
  projId,
}: {
  open: boolean
  handleClose: () => void
  projId: string
}) => {

  const { data: recProj } = useProjById(projId);
  const { data: recContracts } = useContractsByProjIdV2(projId);
  const { data: recEmployees } = useEmployees();

  const handleSave = useSaveReminder({
    recProj: recProj || {} as IProjects,
    recContracts: recContracts || [] as IContracts[],
    recEmployees: recEmployees || [] as IEmployees[],
  });

  const handleAlert = () => {
    // 既に同内容でリマインダー登録されていないか確認する
    // 登録されていたら、そのまま終了する

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
        <Typography variant='h6'>
          担当者へ請求書の発行要求を通知します
        </Typography>

      </DialogTitle>

      <AlertDialogContent agents={recProj?.agents} />

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
