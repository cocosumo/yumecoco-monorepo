import { Grid } from '@mui/material';
import { FormikSelect } from '../../../../../components/ui/selects';
import { CustomerFormKeys } from '../../form';

export const SelectGender = (props: { namePrefix: string }) => {
  return (
    <Grid item xs={12} md={4}>
      <FormikSelect
      name={`${props.namePrefix}${'gender' as CustomerFormKeys}`}
      label="性別"
      options={[
        { label: '女性' },
        { label: '男性' },
        { label: '指定しない' },
      ]}/>
    </Grid>
  );
};