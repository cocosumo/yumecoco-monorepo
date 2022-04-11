import { Grid } from '@mui/material';
import { FormikSelect } from '../../../../../components/ui/selects';

export const SelectGender = () => {
  return (
    <Grid item xs={12} md={4}>
      <FormikSelect name='gender' label="性別" options={[
        { label: '女性' },
        { label: '男性' },
        { label: '指定しない' },
      ]}/>
    </Grid>
  );
};