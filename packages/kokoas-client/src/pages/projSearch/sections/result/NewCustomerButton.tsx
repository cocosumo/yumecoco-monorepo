import { Button, Tooltip } from '@mui/material';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { useNavigateWithQuery } from 'kokoas-client/src/hooks';

export const NewCustomerButton = () => {
  const navigate = useNavigateWithQuery();
  return (
    <Tooltip
      title='新しい顧客を登録します。'
      placement='top'
    >
      <Button
        color='success'
        variant='contained'
        startIcon={<FiberNewIcon />}
        onClick={() => {
          navigate('custGroupEditV2');
        }}
      >
        新規顧客
      </Button>
    </Tooltip>
  );
};