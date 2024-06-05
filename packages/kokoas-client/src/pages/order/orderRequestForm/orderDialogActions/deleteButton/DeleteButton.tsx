import { Button } from '@mui/material';

export const DeleteButton = () => {

  return (
    <Button
      variant="contained"
      color="error"
      onClick={() => {
        alert('開発中です。');
      }}
    >
      削除
    </Button>
  );
};