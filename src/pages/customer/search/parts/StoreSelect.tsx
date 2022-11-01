
import { Grid } from '@mui/material';
import { FormikSelect } from '../../../../components/ui/selects';
import { useStores } from '../../../../hooks/useStores';
import { FormFieldKeys } from '../form';


export const StoreSelect = () => {
  const { stores } = useStores();

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