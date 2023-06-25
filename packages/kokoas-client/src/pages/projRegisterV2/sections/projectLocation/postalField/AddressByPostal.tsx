import { useTypedFormContext } from '../../../hooks/useTypedRHF';
import { Button } from '@mui/material';
import { getAddressByPostal } from 'api-kintone';

export const AddressByPostal = () => {

  const { getValues, setValue } = useTypedFormContext();
  

  return (
    <Button
      variant='outlined'
      onClick={async () => {
        const postal = getValues('postal');
        const result = await getAddressByPostal(postal as string);
        if (!result) return;

        const {
          pref,
          city,
          town,
        } = result;
        const newAddress1 = `${pref.value}${city.value}${town.value}`;
        setValue('address1', newAddress1);
      }}
    >
      郵便番号から検索
    </Button>
  );
};