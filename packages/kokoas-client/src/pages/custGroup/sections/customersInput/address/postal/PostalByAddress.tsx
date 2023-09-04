import { Button, Tooltip } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { getPostalByAddress } from 'kokoas-client/src/api';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { useTypedFormContext } from 'kokoas-client/src/pages/custGroup/hooks/useTypedHooks';

export const PostalByAddress = ({
  index,  
}:{ 
  index: number 
}) => {
  const { setSnackState } = useSnackBar();
  const { getValues, setValue } = useTypedFormContext();
  const queryClient = useQueryClient();


  return (
    <Tooltip title="住所から郵便番号を取得する">

      <Button
        variant='outlined'
        size='small'
        onClick={async () => {
          const address = getValues(`customers.${index}.address1`);

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

          setValue(`customers.${index}.postal`, result, {
            shouldDirty: true,
            shouldTouch: true,
          });
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