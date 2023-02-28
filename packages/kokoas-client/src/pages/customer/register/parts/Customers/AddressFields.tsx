import { Grid } from '@mui/material';
import { FormikTextFieldV2 as FormikTextField } from 'kokoas-client/src/components/ui/textfield/FormikTextFieldV2';
import { useFormikContext } from 'formik';
import { SearchAddress } from 'kokoas-client/src/components/ui/selects/address/SearchAddress';
import { getCustFieldName, TypeOfForm } from '../../form';

export const AddressFields = ({
  namePrefix,
  disabled,
}: {
  namePrefix: string,
  disabled: boolean,
}) => {

  const {
    setFieldValue,
  } = useFormikContext<TypeOfForm>();

  return (
    <Grid container item xs={12}
      spacing={2} mt={1}
    >
      <Grid item xs={8} md={4} >
        <FormikTextField
          disabled={disabled}
          name={`${namePrefix}${getCustFieldName('postal')}`}
          label="郵便番号" placeholder='4710041'
        />
      </Grid>
      {!disabled &&
      <Grid item xs={4} >
        <SearchAddress
          handleChange={({
            prefecture,
            city,
            town,
            postalCode,
          }) => {
            setFieldValue(`${namePrefix}${getCustFieldName('postal')}`, postalCode, false);
            setFieldValue(`${namePrefix}${getCustFieldName('address1')}`, [prefecture, city, town].join(''), false);
          }}
        />
      </Grid>}

      <Grid item xs={12} md={6} />

      <Grid item xs={12} >
        <FormikTextField disabled={disabled}
          name={`${namePrefix}${getCustFieldName('address1')}`}
          label="住所"
          placeholder='愛知県豊田市汐見町8丁目87-8'
        />
      </Grid>
      <Grid item xs={12} mb={2}>
        <FormikTextField disabled={disabled}
          name={`${namePrefix}${getCustFieldName('address2')}`}
          label="住所（建物名）"
          placeholder='マンション山豊101'
        />
      </Grid>

    </Grid>
  );
};
