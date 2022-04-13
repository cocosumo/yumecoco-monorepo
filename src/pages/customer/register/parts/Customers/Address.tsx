
import { Grid, Collapse } from '@mui/material';
import {  FormikTextField, TextMaskPostal } from '../../../../../components/ui/textfield';
import { Contacts } from './Contacts';
import { FormikLabeledCheckBox } from '../../../../../components/ui/checkboxes';
import { CustomerForm, getCustFieldName } from '../../form';
import { useFormikContext } from 'formik';
import { useLazyEffect } from '../../../../../hooks/useLazyEffect';
import { getAddressByPostal } from '../../../../../api/others/postal';
import { TransitionGroup } from 'react-transition-group';


interface AddressProps {
  namePrefix: string,
  index: number
}

const AddressFields = (namePrefix: string) => (
  <Grid container item xs={12} spacing={2}>
    <Grid item xs={12} md={4} >
      <FormikTextField name={`${namePrefix}${getCustFieldName('postal')}`} label="郵便番号" placeholder='471-0041' inputComponent={TextMaskPostal}/>
    </Grid>
    <Grid item xs={12} md={8} />
    <Grid item xs={12} >
      <FormikTextField name={`${namePrefix}${getCustFieldName('address1')}`} label="住所" placeholder='愛知県豊田市汐見町8丁目87-8'/>
    </Grid>
    <Grid item xs={12} mb={2}>
      <FormikTextField name={`${namePrefix}${getCustFieldName('address2')}`} label="住所（建物名）" placeholder='マンション山豊101'/>
    </Grid>
    <Contacts namePrefix={namePrefix}/>
  </Grid>
);

export const Address = (props: AddressProps) => {
  const {
    setFieldValue,
    values: { customers },
  } = useFormikContext<CustomerForm>();
  const {
    namePrefix,
    index,
  } = props;

  const { isSameAddress, postal } = customers[index] ?? { isSameAddress: true, postal: '' };
  const isFirstCustomer = !index;

  useLazyEffect(()=>{
    document.querySelectorAll('main')[1].scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [customers.length, isSameAddress], 1000);

  useLazyEffect(()=>{
    getAddressByPostal(postal as string).then((address)=>{
      setFieldValue(`${namePrefix}${getCustFieldName('address1')}`, address);
    });
  }, [postal], 300);




  return (
    <>
      { !isFirstCustomer &&
      <Grid item xs={12}>
        <FormikLabeledCheckBox name={`${namePrefix}${getCustFieldName('isSameAddress')}`} label="住所と連絡先は【契約者１】と同じ" defaultVal={isSameAddress}/>
      </Grid>
      }

      {isFirstCustomer && <>{ AddressFields(namePrefix) }</>}

      <Grid item xs={12} >
        <TransitionGroup>
          {(!isSameAddress && !isFirstCustomer) && <Collapse timeout={600}>{AddressFields(namePrefix)}</Collapse>}
        </TransitionGroup>
      </Grid>
    </>
  );
};