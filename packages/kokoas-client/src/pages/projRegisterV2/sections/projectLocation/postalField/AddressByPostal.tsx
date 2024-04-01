import { useTypedFormContext } from '../../../hooks/useTypedRHF';
import { Button, Tooltip } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { getAddressByPostal } from 'api-kintone';
import { useSnackBar } from 'kokoas-client/src/hooks';

export const AddressByPostal = () => {
  const queryClient = useQueryClient();
  const { setSnackState } = useSnackBar();
  const { getValues, setValue } = useTypedFormContext();
  



  return (
    <Tooltip title="郵便番号から住所を取得する">

      <Button
        variant='outlined'
        onClick={() => {
          const postal = getValues('postal');
          
          queryClient.fetchQuery(
            ['addressPostalCode', { postalCode: postal }],
            () => getAddressByPostal(postal as string),
            {
              staleTime: 1000 * 60 * 60 * 24,
            },
          )
            .then((result) => {
              if (!result) {
                setSnackState({
                  open: true,
                  message: '郵便番号から住所を取得できませんでした',
                  severity: 'warning',
                });
                return;
              }

              const {
                pref,
                city,
                town,
              } = result;
              const newAddress1 = `${pref.value}${city.value}${town.value}`;
              setValue('address1', newAddress1);
              setSnackState({
                open: true,
                message: '郵便番号から住所を取得しました',
                severity: 'success',
              });


            });

          
        }}
      >
        郵便番号から検索
      </Button>
    </Tooltip>

  );
};