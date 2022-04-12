
import { Grid } from '@mui/material';
import {  FormikTextField, TextMaskPostal } from '../../../../../components/ui/textfield';
import { Contacts } from './Contacts';
import { FormikLabeledCheckBox } from '../../../../../components/ui/checkboxes';
import { CustomerForm, getFieldName } from '../../form';
import { useFormikContext } from 'formik';


interface AddressProps {
  namePrefix: string,
  index: number
}

export const Address = (props: AddressProps) => {
  const { values: { customers } } = useFormikContext<CustomerForm>();
  const {
    namePrefix,
    index,
  } = props;

  const { isSameAddress } = customers[index];
  const isFirstCustomer = !index;

  return (
    <>
      { !isFirstCustomer &&
      <Grid item xs={12}>
        <FormikLabeledCheckBox name={`${namePrefix}${getFieldName('isSameAddress')}`} label="住所と連絡先は【契約者１】と同じ"/>
      </Grid>
      }

      {
        (!isSameAddress || isFirstCustomer) &&
        <>
          <Grid item xs={12} md={4} >
            <FormikTextField name={`${namePrefix}${getFieldName('postal')}`} label="郵便番号" placeholder='471-0041' inputComponent={TextMaskPostal}/>
          </Grid>
          <Grid item xs={12} md={8} />
          <Grid item xs={12} >
            <FormikTextField name={`${namePrefix}${getFieldName('address1')}`} label="住所" placeholder='愛知県豊田市汐見町8丁目87-8'/>
          </Grid>
          <Grid item xs={12} mb={2}>
            <FormikTextField name={`${namePrefix}${getFieldName('address2')}`} label="住所（建物名）" placeholder='マンション山豊101'/>
          </Grid>
          <Contacts namePrefix={namePrefix}/>
        </>
      }
    </>
  );
};