import { FormGroup, FormLabel, TextField } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
import { useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../../../schema';

export const CustomerDetails = () => {
  const { register } = useFormContext<TypeOfForm>();

  return (
    <FormGroup>
      <FormLabel>
        顧客情報
      </FormLabel>

      <Grid container mt={1} spacing={2}>
        <Grid xs={12}>
          <TextField 
            size="small" 
            label="お客様名"
            placeholder='氏名・シメイ'
            {...register('custName')}
          />
        </Grid>
        <Grid xs>
          <TextField 
            fullWidth 
            size="small" 
            label="住所"
            placeholder='発注者住所・工事場所住所'
            {...register('address')}
          />
        </Grid>
      </Grid>
    </FormGroup>
  );
};