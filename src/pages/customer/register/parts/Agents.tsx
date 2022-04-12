import { Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import { PageSubTitle } from '../../../../components/ui/labels';
import { FormikSelect } from '../../../../components/ui/selects';
import { useEmployeeOptions, useStores } from '../../../../hooks';
import { getFieldName, CustomerForm } from '../form';


export const Agents = () => {
  const {
    values: {
      store,
      cocoAG1,
      yumeAG1,
    },
  } = useFormikContext<CustomerForm>();
  const { stores } = useStores();

  const cocoAGOptions = useEmployeeOptions({
    type: 'cocoAG',
    storeId: store,
    isStoreIdRequired: true,
  });

  const cocoAGOptions2 = cocoAGOptions
    ?.filter((item) => item.value !==  cocoAG1);

  const yumeAGOptions = useEmployeeOptions({
    type: 'yumeAG',
    storeId: store,
    isStoreIdRequired: true,
  });

  const yumeAGOptions2 = yumeAGOptions
    ?.filter((item) => item.value !==  yumeAG1);

  return (
    <Grid container item xs={12} md={3} spacing={2}>
      <PageSubTitle label='担当情報'/>
      <Grid item xs={12}>
        <FormikSelect name={getFieldName('store')} label="店舗" options={stores} required/>
      </Grid>
      <Grid item xs={12}>
        <FormikSelect name={getFieldName('cocoAG1')} label="営業担当者1" options={cocoAGOptions} disabled={!store} required/>
      </Grid>
      <Grid item xs={12}>
        <FormikSelect name={getFieldName('cocoAG2')} label="営業担当者2" options={cocoAGOptions2} disabled={!store || !cocoAG1}  />
      </Grid>
      <Grid item xs={12}>
        <FormikSelect name={getFieldName('yumeAG1')} label="ゆめてつAG1" options={yumeAGOptions} disabled={!store}/>
      </Grid>
      <Grid item xs={12}>
        <FormikSelect name={getFieldName('yumeAG2')} label="ゆめてつAG2"  options={yumeAGOptions2} disabled={!store || !yumeAG1}/>
      </Grid>

    </Grid>
  );
};