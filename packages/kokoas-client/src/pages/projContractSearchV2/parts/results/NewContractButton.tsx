import { Button, Tooltip } from '@mui/material';
import { useNavigateWithQuery } from 'kokoas-client/src/hooks';
import FiberNewIcon from '@mui/icons-material/FiberNew';

export const NewContractButton = () => {
  const navigate = useNavigateWithQuery();
  return (
    <Tooltip
      title='新しい契約を作成します。'
      placement='top'
    >
      <Button
        color='success'
        variant='contained'
        startIcon={<FiberNewIcon />}
        onClick={() => {
          navigate('projContractPreviewV2');
        }}
      >
        新規契約
      </Button>
    </Tooltip>
  );
};