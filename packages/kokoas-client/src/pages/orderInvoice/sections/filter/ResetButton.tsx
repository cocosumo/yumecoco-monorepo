import { Button, Tooltip } from '@mui/material';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { useNavigateWithQuery } from 'kokoas-client/src/hooks';

export const ResetButton = () => {
  const { reset } = useTypedFormContext();
  const navigate = useNavigateWithQuery();

  return (
    <Tooltip title="検索条件をリセットします">
      <Button
        variant={'text'}
        color={'primary'}
        size='small'
        onClick={() => {
          reset();
          navigate('projOrderInvoiceSearch');
        }}
      >
        リセット
      </Button>
    </Tooltip>
  );
};