import { Grid } from '@mui/material';
import { FormikSelect } from '../../../../../components/ui/selects';

export const SelectBirtdate = () => {
  return (
    <Grid container item xs={12} md={8} spacing={1} >
      <Grid item xs={6}>
        <FormikSelect 
        name='birthYear' 
        label="生年" 

        options={[
          { label: '女性' },
          { label: '男性' },
          { label: '指定しない' },
        ]}
        />
      </Grid>
      <Grid item xs={3}>
        <FormikSelect 
        name='birthMonth' 
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
        name='birthDay' 
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