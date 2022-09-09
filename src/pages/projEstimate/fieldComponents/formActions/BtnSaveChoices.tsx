import { Button, Stack } from '@mui/material';
import { SaveLoading } from '../../../../components/ui/icons/SaveLoading';
import { useBackdrop, useSnackBar } from '../../../../hooks';
import { TypeOfForm } from '../../form';


export const BtnSaveChoices = ({
  handleClose,
  setSubmitting,
}:{
  handleClose: () => void,
  setSubmitting: (isSubmitting: boolean) => void,
  values: TypeOfForm
}) => {
  const { setBackdropState } = useBackdrop();
  const { setSnackState } = useSnackBar();



  /* 保存処理 */
  const handleSave = (
    actionAfterSave: () => void,
  ) => {

    /** ダイアログを閉じる */
    handleClose();

    /** ローディング状態を表示する */
    setBackdropState({
      open: true,
      content: <SaveLoading loading={true} success={false} />,
    });

    /** ここで保存処理 */
    setTimeout(()=>{
      setSnackState({
        open: true,
        severity: 'success',
        message: '保存しました。',
        handleClose: actionAfterSave,
      });
    }, 2000);
  };

  const handleBackSuccess = () => {

    /** ローディング後、成功を表示 */
    setBackdropState({
      open: true,
      content: <SaveLoading loading={false} success={true} />,
    });

    /** １秒後、閉じる */
    setTimeout(()=>{
      setBackdropState({
        open: false,
      });
      setSubmitting(false);
    }, 1000);
  };

  const handleSaveThenClose = () => handleSave(()=>{
    handleBackSuccess();
    self?.window?.close();
  });

  const handleSaveThenEdit = () => handleSave(()=>{
    handleBackSuccess();
  });


  return (
    <Stack spacing={2}>
      <Button
        variant={'outlined'}
        onClick={handleSaveThenClose}
      >
        保存して画面を閉じる
      </Button>
      <Button
        variant={'contained'}
        onClick={handleSaveThenEdit}
      >
        編集画面に戻る
      </Button>

    </Stack>
  );
};