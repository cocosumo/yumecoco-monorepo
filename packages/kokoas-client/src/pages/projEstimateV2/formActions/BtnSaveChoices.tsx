import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export const BtnSaveChoices = ({
  handleClose,
  handleSave,
}:{
  handleClose: () => void,
  handleSave: () => void,
}) => {
  const navigate = useNavigate();

  /* 保存処理 */
  const handleClickSave = () => {
    handleClose();
    handleSave();
  };



  return (
    <Stack spacing={2}>
      <Button
        variant={'outlined'}
        onClick={() => {
          handleClickSave();
          navigate('/');
        }}
      >
        保存して画面を閉じる
      </Button>
      <Button
        variant={'contained'}
        onClick={handleClickSave}
      >
        編集画面に戻る
      </Button>

    </Stack>
  );
};