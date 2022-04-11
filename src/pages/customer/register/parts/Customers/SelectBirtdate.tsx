import { Grid } from '@mui/material';
import { FormikSelect } from '../../../../../components/ui/selects';
import { CustomerFormKeys } from '../../form';

export const SelectBirtdate = (props: { namePrefix: string }) => {
  return (
    <Grid container item xs={12} md={8} spacing={1} >
      <Grid item xs={6}>
        <FormikSelect
        name={`${props.namePrefix}${'birthYear' as CustomerFormKeys}`}
        label="生年"
        helperText='<任意>個別設定可'
        options={[
          { label: '女性' },
          { label: '男性' },
          { label: '指定しない' },
        ]}
        />
      </Grid>
      <Grid item xs={3}>
        <FormikSelect
        name={`${props.namePrefix}${'birthMonth' as CustomerFormKeys}`}
        label="月"

        options={[
          { label: '女性' },
          { label: '男性' },
          { label: '指定しない' },
        ]}
        />
      </Grid>
      <Grid item xs={3}>
        <FormikSelect
        name={`${props.namePrefix}${'birthDay' as CustomerFormKeys}`}
        label="日"

        options={[
          { label: '女性' },
          { label: '男性' },
          { label: '指定しない' },
        ]}
        />
      </Grid>
    </Grid>
  );
};