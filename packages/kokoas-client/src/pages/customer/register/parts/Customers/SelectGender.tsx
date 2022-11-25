import { Grid } from '@mui/material';
import { FormikSelect } from '../../../../../components/ui/selects';
import { CustomerInstanceKeys } from '../../form';

export const SelectGender = ({ namePrefix }: { namePrefix: string }) => {

  const genderField: CustomerInstanceKeys =  'gender';

  return (
    <Grid item xs={12} md={3}>
      <FormikSelect
        name={`${namePrefix}${genderField}`}
        label="性別"
        options={['女性', '男性', '指定なし'].map((item) => ({ label: item, value: item }))} 
      />
    </Grid>
  );
};