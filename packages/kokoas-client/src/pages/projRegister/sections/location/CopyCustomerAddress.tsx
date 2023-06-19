import { Button } from '@mui/material';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
import { useCustomersByCustGroupId } from 'kokoas-client/src/hooksQuery';

export const CopyCustomerAddress = () => {
  const {
    setValues, 
    values: {
      custGroupId,
    } } = useFormikContext<TypeOfForm>();

  const { data: customers } = useCustomersByCustGroupId(custGroupId || '');

  const {
    postalCode,
    address1,
    address2,
  } = customers?.[0] || {};

  /* postal: postalCode.value.replace('-', ''),
        address1: address1.value,
        address2: address2.value, */

  return (
    <Button
      //size='large'
      color='primary' 
      variant='contained'
      disabled={!customers}
      onClick={() => {
        setValues((prev) => {
          return {
            ...prev,
            postal: postalCode?.value.replace('-', '') || '',
            address1: address1?.value || '',
            address2: address2?.value || '',
          };
        });
      }}
    >
      現住所を
      <br />
      コピーする
    </Button>
  );
};