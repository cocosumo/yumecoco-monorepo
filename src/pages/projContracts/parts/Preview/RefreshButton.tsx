import { LoadingButton } from '@mui/lab';
import RefreshIcon from '@mui/icons-material/Refresh';

export const RefreshButton = ({
  handleRefetch,
  loading,
}: {
  handleRefetch: () => void,
  loading: boolean,

}) => {

  return (
    <LoadingButton
      variant={'outlined'}
      startIcon={<RefreshIcon />}
      loading={loading}
      onClick={() => handleRefetch()}
    >
      更新
    </LoadingButton>
  );
};