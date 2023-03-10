import { Grid, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { PageSubTitle } from '../../../../components/ui/labels';
import { FormikSelect } from '../../../../components/ui/selects';
import { useStoreOptions } from '../../../../hooksQuery';
import { useEmployeeOptions } from '../../../../hooksQuery/useEmployeeOptions';

import { getFieldName, TypeOfForm, KeyOfForm } from '../form';


export const Agents = ({
  disabled,
}: {
  disabled: boolean
}) => {
  const {
    values,
    setFieldValue,
  } = useFormikContext<TypeOfForm>();


  const {
    store,
    cocoAG1,
    yumeAG1,
  } = values;
  const { data } = useStoreOptions();


  const cocoAGOptions = useEmployeeOptions({
    agentType: 'cocoAG',
    storeId: store,
  });


  const cocoAGOptions2 = cocoAGOptions
    ?.filter((item) => item.value !==  cocoAG1);

  const yumeAGOptions = useEmployeeOptions({
    agentType: 'yumeAG',
    storeId: store,
  });

  const yumeAGOptions2 = yumeAGOptions
    ?.filter((item) => item.value !==  yumeAG1);


  const handleStoreChange = () => {
    /* Reset agent form on store change  */
    (['cocoAG1', 'cocoAG2', 'yumeAG1', 'yumeAG2'] as KeyOfForm[])
      .forEach( item=> setFieldValue(item, '') );
  };

  const handleAGChange = (mainValue :string, compareField: KeyOfForm) => {
    /* Clear compareField when it is the same as the main field value */
    if (!mainValue || mainValue === values[compareField]) {
      setFieldValue(compareField, '');
    }
  };


  return (
    <Grid item xs={12} lg={6}
      xl={6}
    >
      <Stack direction={'column'} spacing={2}>
        <PageSubTitle label='担当情報' />

        <FormikSelect
          disabled={disabled}
          name={getFieldName('store')}
          label="店舗" options={data}
          required
          onChange={handleStoreChange}
        />


        <FormikSelect
          name={getFieldName('cocoAG1')}
          label="営業担当者1"
          options={cocoAGOptions}
          disabled={disabled || !store}
          required
          onChange={(e)=> handleAGChange(e.target.value, 'cocoAG2')}
        />


        <FormikSelect
          name={getFieldName('cocoAG2')}
          label="営業担当者2"
          options={cocoAGOptions2}
          disabled={disabled || !store || !cocoAG1}
        />

        <FormikSelect
          name={getFieldName('yumeAG1')}
          label="ゆめてつAG1"
          options={yumeAGOptions}
          disabled={disabled || !store}
          onChange={(e)=> handleAGChange(e.target.value, 'yumeAG2')}
        />

        <FormikSelect
          name={getFieldName('yumeAG2')}
          label="ゆめてつAG2"
          options={yumeAGOptions2}
          disabled={disabled || !store || !yumeAG1}
        />


      </Stack>
    </Grid>
  );
};