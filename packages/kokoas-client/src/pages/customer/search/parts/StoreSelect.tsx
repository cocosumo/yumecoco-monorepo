
import { Grid } from '@mui/material';
import { useStoreOptions } from 'kokoas-client/src/hooksQuery';
import { FormikSelect } from '../../../../components/ui/selects';

import { FormFieldKeys } from '../form';


export const StoreSelect = () => {
  const { data: stores } = useStoreOptions();

  return (
    <Grid item xs={12} md={3}>
      <FormikSelect
        name={'storeId' as FormFieldKeys}
        label='店舗'
        options={[{ label: '--', value: '' }, ...stores ?? []]} 
      />
    </Grid>
  );
};