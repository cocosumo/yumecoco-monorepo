import { Button } from '@mui/material';
import { useTypedFormContext } from '../../hooks/useTypedRHF';

export const ResetButton = () => {
  const { reset } = useTypedFormContext();

  return (
    <Button
      variant={'outlined'}
      color={'primary'}
      size='small'
      onClick={() => {
        reset();
      }}
    >
      リセット
    </Button>
  );
};