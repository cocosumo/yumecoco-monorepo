import { Button, Tooltip } from '@mui/material';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { initialValues } from '../../form';

export const ResetButton = () => {
  const { reset } = useTypedFormContext();

  return (
    <Tooltip title="検索条件をリセットします">
      <Button
        variant={'text'}
        color={'primary'}
        size='small'
        onClick={() => {
          reset(initialValues);
        }}
      >
        リセット
      </Button>
    </Tooltip>
  );
};