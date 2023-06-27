import { useTypedFormContext } from '../../../hooks/useTypedRHF';
import { Button, Tooltip } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { getPostalByAddress } from 'kokoas-client/src/api';
import { useSnackBar } from 'kokoas-client/src/hooks';

export const PostalByAddress = () => {
  const { setSnackState } = useSnackBar();
  const { getValues, setValue } = useTypedFormContext();
  const queryClient = useQueryClient();


  return (
    <Tooltip title="住所から郵便番号を取得する">

      <Button
        variant='outlined'
        onClick={async () => {
          const address = getValues('address1');

          const result = await queryClient.fetchQuery(
            ['postalCodeAddress', { address: address }],
            () => getPostalByAddress(address as string),
            {
              staleTime: 1000 * 60 * 60 * 24,
            },
          );

          if (!result) {
            setSnackState({
              open: true,
              message: '住所から郵便番号を取得できませんでした',
              severity: 'warning',
            });
            return;
          }

          setValue('postal', result);
          setSnackState({
            open: true,
            message: '住所から郵便番号を取得しました',
            severity: 'success',
          });
        }}
      >
        住所から検索
      </Button>
    </Tooltip>

  );
};