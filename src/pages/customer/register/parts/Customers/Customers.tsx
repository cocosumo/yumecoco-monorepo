import { Grid } from '@mui/material';
import { PageSubTitle } from '../../../../../components/ui/labels';
import {  FormikTextField, TextMaskPostal } from '../../../../../components/ui/textfield';
import { SelectGender } from './SelectGender';
import { SelectBirtdate } from './SelectBirtdate';
import { Contacts } from './Contacts';
import { FieldArray, ArrayHelpers, useFormikContext } from 'formik';
import { CustomerForm, CustomerFormKeys, CustomerInstanceKeys } from '../../form';


interface CustomerProps extends ArrayHelpers{
  namePrefix: string,
}

const Customer =  <T extends CustomerInstanceKeys>(props: CustomerProps) => {
  const {
    namePrefix,
  } = props;

  return (
    <Grid container item xs={6} spacing={2}>
      <PageSubTitle label='契約者１' />
      <Grid item xs={12}>
        <FormikTextField name={`${namePrefix}${'custName' as T}`} label="氏名" placeholder='山田　太郎' />
      </Grid>
      <Grid item xs={12}>
        <FormikTextField name={`${namePrefix}${'custNameReading' as T}`} label="氏名フリガナ" placeholder='ヤマダ　タロウ' />
      </Grid>
      <SelectGender namePrefix={namePrefix}/>
      <SelectBirtdate namePrefix={namePrefix}/>

      <Grid item xs={4} mt={2}>
        <FormikTextField name={`${namePrefix}${'postal' as T}`} label="郵便番号" placeholder='471-0041' inputComponent={TextMaskPostal}/>
      </Grid>
      <Grid item xs={12} >
        <FormikTextField name={`${namePrefix}${'address1' as T}`} label="住所" placeholder='愛知県豊田市汐見町8丁目87-8'/>
      </Grid>
      <Grid item xs={12} mb={2}>
        <FormikTextField name={`${namePrefix}${'address2' as T}`} label="住所（建物名）" placeholder='マンション山豊101'/>
      </Grid>

      <Contacts namePrefix={namePrefix}/>
    </Grid>
  );
};

export const Customers = () => {
  const { values: { customers } } = useFormikContext<CustomerForm>();
  const arrayFieldName = 'customers' as CustomerFormKeys;

  console.log(customers, 'customers');
  return (
    <FieldArray
      name={arrayFieldName}
      render={(arrHelpers) => (
        <>
          {
            customers.map((_, index) => {
              const namePrefix = `${arrayFieldName}[${index}].`;
              return (
                <Customer key={index} namePrefix={namePrefix} {...arrHelpers}/>
              );
            })
          }
        </>
      )}
    />

  );
};