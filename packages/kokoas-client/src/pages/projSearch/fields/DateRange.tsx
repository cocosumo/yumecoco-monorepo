import { FormGroup, FormLabel, Stack } from '@mui/material';
import { CustomDate } from './CustomDate';
import { KeyOfForm } from '../schema';



export const DateRange = ({
  label,
  fromName,
  toName,
}:{
  label: string
  fromName: KeyOfForm
  toName: KeyOfForm
}) => {
  return (
    <FormGroup>
      <FormLabel 
        sx={{
          mb: 1,
        }}
      >
        {label}
      </FormLabel>
   
      <Stack 
        spacing={2} 
        direction={{ xs: 'column', sm: 'row' }}
      >
        <CustomDate name={fromName} iconLabel='から' />
        <CustomDate name={toName} iconLabel='まで' />
      </Stack>

    </FormGroup>
  );
};