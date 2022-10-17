import { LoadingButton } from '@mui/lab';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';

export const RefreshButton = ({
  handleRefetch,
  loading,
}: {
  handleRefetch: () => void,
  loading: boolean,

}) => {
  const {
    values: {
      signMethod,
      envelopeStatus,
    },
  } = useFormikContext<TypeOfForm>();

  let jaSignMethod = '電子契約';
  if (signMethod === 'wetInk') {
    jaSignMethod = '紙印刷';
  }

  const isWithContract = envelopeStatus !== '';

  return (
    <LoadingButton
      variant={'outlined'}
      startIcon={<RefreshIcon />}
      loading={loading}
      onClick={() => handleRefetch()}
    >
      {`${isWithContract ? jaSignMethod : '更新'}`}
    </LoadingButton>
  );
};