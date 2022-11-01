import { Button, Stack } from '@mui/material';
import { SaveLoading } from '../../../../components/ui/icons/SaveLoading';
import { useBackdrop } from '../../../../hooks';


export const BtnSaveChoices = ({
  handleClose,
  handleSave,
}:{
  handleClose: () => void,
  handleSave: (actionAfterSave?: ()=> void) => void,
}) => {
  const { setBackdropState } = useBackdrop();

  /* 保存処理 */
  const handleClickSave = (
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
    handleSave(actionAfterSave);
  };

  const handleSuccess = () => {

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
    }, 1000);
  };

  const handleSaveThenClose = () => handleClickSave(()=>{
    handleSuccess();
    self?.window?.close();
  });

  const handleSaveThenEdit = () => handleClickSave(()=>{
    handleSuccess();
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