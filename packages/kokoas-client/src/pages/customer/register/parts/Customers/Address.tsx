
import { Grid } from '@mui/material';
import { FormikLabeledCheckBox } from '../../../../../components/ui/checkboxes';
import { TypeOfForm, getCustFieldName } from '../../form';
import { useFormikContext } from 'formik';
import { useLazyEffect } from '../../../../../hooks/useLazyEffect';
import { getAddressByPostal } from '../../../../../api/others/getAddressByPostal';
import { useRef } from 'react';
import { AddressFields } from './AddressFields';



interface AddressProps {
  namePrefix: string,
  index: number
}

export const Address = (props: AddressProps) => {
  const {
    setFieldValue,
    dirty,
    values: { customers },
  } = useFormikContext<TypeOfForm>();

  const {
    namePrefix,
    index,
  } = props;

  const { isSameAddress = true, postal, address1 } = customers[index] ?? {};
  const isFirstCustomer = !index;
  const divRef = useRef<HTMLDivElement>(null);

  useLazyEffect(()=>{

    if (customers.length > 1 && dirty) {
      divRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

  }, [customers.length, isSameAddress ], 300);

  useLazyEffect(()=>{

    /* Automatically retrieve address if address is empty */
    if (postal && !address1) {

      getAddressByPostal(postal as string).then((address)=>{
        if (address) {
          setFieldValue(`${namePrefix}${getCustFieldName('address1')}`, Object.values(address).join(''));
        }
      });
    }
  }, [postal], 300);

  return (
    <>
      { !isFirstCustomer &&
      <Grid item xs={12}>
        <FormikLabeledCheckBox name={`${namePrefix}${getCustFieldName('isSameAddress')}`} label="住所と連絡先は【契約者１】と同じ" defaultVal={isSameAddress} />
      </Grid>}

      {!isSameAddress &&
        <Grid item xs={12} ref={divRef}>
          <AddressFields
            namePrefix={namePrefix}
          />
        </Grid>}

    </>
  );
};