import { IconButton, Tooltip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useConfirmDialog } from 'kokoas-client/src/hooks';

export const DeleteButton = () => {
  const { setDialogState } = useConfirmDialog();

  const handleDelete = () => {
    setDialogState({
      open: true,
      title: '削除しますか？',
      content: '削除したデータは元に戻せません。',
    });
  };

  return (
    <Tooltip title={'削除'}>
      <IconButton 
        size='small'
        sx={{
          bgcolor: 'white',
        }}
        onClick={handleDelete}
      >
        <ClearIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );
};