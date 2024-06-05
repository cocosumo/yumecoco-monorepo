import { Button } from '@mui/material';
import { useConfirmDialog } from 'kokoas-client/src/hooks';

export const DeleteButton = () => {

  const { setDialogState } = useConfirmDialog();

  return (
    <Button
      variant="contained"
      color="error"
      onClick={() => {
        setDialogState({
          open: true,
          title: '削除確認',
          content: '削除するとデータは完全に消え復元できません。削除しますか？',
          handleYes: () => {
            alert('開発中です。');
          },
        });
      }}
    >
      削除
    </Button>
  );
};