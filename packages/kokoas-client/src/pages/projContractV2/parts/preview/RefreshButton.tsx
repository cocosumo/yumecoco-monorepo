import { LoadingButton } from '@mui/lab';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../schema';
import { TSignMethod } from 'types';
import { useIsFetching, useQueryClient } from '@tanstack/react-query';
import { AppIds } from 'config';


export const RefreshButton = () => {
  const queryClient = useQueryClient();
  const isFetching = !!useIsFetching();

  const [
    signMethod,
    envelopeStatus,
  ] = useWatch<TypeOfForm>({
    name: [
      'signMethod', 
      'envelopeStatus',
      'contractId',
    ],
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
      loading={isFetching}
      onClick={() => {
        queryClient.invalidateQueries({ 
          queryKey: [AppIds.contracts],
        });

      }}
    >
      {`${isWithContract ? jaSignMethod : '更新'}`}
    </LoadingButton>
  );
};