import { Alert, Button, Tooltip } from '@mui/material';
import { useConfirmDialog } from 'kokoas-client/src/hooks';
import { useLogicalDeleteCustGroupById } from 'kokoas-client/src/hooksQuery';
import { useTypedFormContext } from '../../hooks/useTypedHooks';

export const DeleteButton = ({
  disabled,
}:{
  disabled: boolean,
}) => {
  const {
    getValues,
  } = useTypedFormContext();

  const {
    setDialogState,
  } = useConfirmDialog();

  const {
    mutate,
  } = useLogicalDeleteCustGroupById();
  
  return (
    <Tooltip
      title={'顧客を削除します。'}
    >
      <Button
        variant='contained'
        color='error'
        disabled={disabled}
        onClick={() => {
          setDialogState({
            open: true,
            title: '顧客を削除しますか？',
            handleYes: () => {
              const custGroupId = getValues('custGroupId');
              mutate({
                custGroupId,
                shouldDelete: true,
              });
            },
            content: (
              <Alert severity='warning'>
                論理削除します。よろしいですか？
              </Alert>
            ),
          });
        }}
      >
        削除
      </Button>
    </Tooltip>
  );
};