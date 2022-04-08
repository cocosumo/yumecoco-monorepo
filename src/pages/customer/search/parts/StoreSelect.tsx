
import { Grid } from '@mui/material';
import { FormikSelect } from '../../../../components/ui/selects';
import useStores from '../../../../hooks/useStores';
import { FormFieldNames } from '../form';


export const StoreSelect = () => {
  const { stores } = useStores();

  return (
    <Grid item xs={12} md={3}>
      <FormikSelect name={'storeId' as FormFieldNames } label='店舗' options={stores}/>
    </Grid>
  );
};