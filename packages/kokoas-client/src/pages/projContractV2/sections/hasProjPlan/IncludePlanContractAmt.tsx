import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { Checkbox, FormControl, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material';

export const IncludeContractPlanAmt = () => {
  const { control } = useTypedFormContext();
   
  return (
    <Stack 
      direction={'row'}
      spacing={2}
      alignItems={'center'}
    >
      <Typography variant='body1' fontSize={14}>
        本契約には「設計契約金」が
      </Typography>
      <Controller 
        name='includePlanContractAmt'
        control={control}
        render={({ 
          field:{
            value,
            onChange,
            ...otherFieldProps
          } }) => {

          return (
            <FormControl
              sx={{
                ml:2, // avoid croppping the radio button
              }}
            >
              <FormGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                row
                {...otherFieldProps}
              >
                <FormControlLabel 
                  control={(
                    <Checkbox 
                      checked={value}
                      onChange={onChange}
                    />)} 
                  label={value ? '含まれる' : '含まれない'}
                />
            
              </FormGroup>
            </FormControl>);
        }}
      />
    </Stack>
  );
};