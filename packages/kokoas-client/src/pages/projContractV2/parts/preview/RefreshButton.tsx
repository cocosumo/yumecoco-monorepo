import { LoadingButton } from '@mui/lab';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../schema';
import { TSignMethod } from 'types';

export const RefreshButton = () => {
  const [
    signMethod,
    envelopeStatus,
  ] = useWatch<TypeOfForm>({
    name: ['signMethod', 'envelopeStatus'],
  });

  let jaSignMethod = '電子契約';
  
  if (signMethod as TSignMethod === 'wetInk') {
    jaSignMethod = '紙印刷';
  }

  const isWithContract = envelopeStatus !== '';

  return (
    <LoadingButton
      variant={'outlined'}
      startIcon={<RefreshIcon />}
      //loading={loading}
      //onClick={() => handleRefetch()}
    >
      {`${isWithContract ? jaSignMethod : '更新'}`}
    </LoadingButton>
  );
};