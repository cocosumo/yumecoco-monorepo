import { Alert, Button, Tooltip } from '@mui/material';
import { useConfirmDialog } from 'kokoas-client/src/hooks';
import { useLogicalDeleteCustGroupById } from 'kokoas-client/src/hooksQuery';
import { useTypedFormContext } from '../../hooks/useTypedHooks';

export const RestoreButton = ({
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
      title={'顧客を復元します。'}
    >
      <Button
        variant='contained'
        color='success'
        disabled={disabled}
        onClick={() => {
          setDialogState({
            open: true,
            title: '顧客を復元しますか？',
            handleYes: () => {
              const custGroupId = getValues('custGroupId');
              mutate({
                custGroupId,
                shouldDelete: false,
              });
            },
            content: (
              <Alert severity='warning'>
                論理復元します。よろしいですか？
              </Alert>
            ),
          });
        }}
      >
        復元
      </Button>
    </Tooltip>
  );
};