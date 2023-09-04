import { Alert, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useConfirmDialog } from 'kokoas-client/src/hooks';


export const DeleteButton = ({
  onClick,
}:{
  onClick: () => void,
}) => {
  const {
    setDialogState,
  } = useConfirmDialog();

  return (
    <Tooltip title={'顧客を削除'}>
      <IconButton
        color='error'
        onClick={() => {
          setDialogState({
            title: '顧客削除',
            content: (
              <Alert severity='warning'>
                {'顧客を削除します。よろしいですか？'}
              </Alert>
            ),
            handleYes: onClick,
          });
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};