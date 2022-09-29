import { PageSubTitle } from '../../../../components/ui/labels/PageSubTitle';
import { Grid, debounce } from '@mui/material';
import { FormikLabeledCheckBox } from '../../../../components/ui/checkboxes';
import { BuildingType, ConstructionSearch } from './parts';
import { FormikTextField, TextMaskPostal } from '../../../../components/ui/textfield';

import { getFieldName, initialValues } from '../../form';
import { useFormikContext } from 'formik';
import { getAddressByPostal } from '../../../../api/others/postal';
import { useCallback } from 'react';


export const ConstructionLocation = () => {

  const {
    status,
    values : {
      custGroupId,
      address1,
      isChkAddressKari,
    },
    setFieldValue,
  } = useFormikContext<typeof initialValues>();

  const isReadOnly = (status as TFormStatus ) === 'disabled';


  const handleGenerateAddress = useCallback(debounce((e: React.FocusEvent<any, Element>) => {
    const postal = e.target.value;

    if (postal && !address1) {
      getAddressByPostal(postal)
        .then(resp => {
          setFieldValue('address1', resp);
        });
    }

  }, 500), [address1]);



  return (
    <>
      <PageSubTitle label="工事場所情報" />
      { !isReadOnly && <ConstructionSearch disabled={!custGroupId} />}

      <Grid item xs={12} md={3}>
        <FormikTextField
          name="postal"
          label="郵便番号"
          placeholder='442-0888'
          disabled={isReadOnly}
          inputComponent={TextMaskPostal}
          onChange={handleGenerateAddress}
          shrink={true}
          required
        />
      </Grid>

      <Grid item md={9} />

      <Grid item xs={12} md={8}>
        <FormikTextField name="address1" label="住所" disabled={isReadOnly}
          required
        />
      </Grid>

      <Grid item xs={12} md={8}>
        <FormikTextField name="address2" label="住所（番地以降）" disabled={isReadOnly}
          required
        />
      </Grid>


      <Grid item xs={12} md={4}>
        <FormikLabeledCheckBox label="仮換地地番を入力する" name={getFieldName('isChkAddressKari')} disabled={isReadOnly} />
      </Grid>

      {
        isChkAddressKari &&
        <Grid item xs={12} md={8}>
          <FormikTextField name="addressKari" label="仮換地住所" disabled={isReadOnly} />
        </Grid>
      }


      <Grid item xs={12} md={8}>
        <BuildingType disabled={isReadOnly} />
      </Grid>



    </>
  );
};