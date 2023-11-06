import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';

export const IncludeContractPlanAmt = () => {
  const { control } = useTypedFormContext();
   
  return (
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
                    value={value}
                    onChange={onChange}
                  />)} 
                label={value ? '含まれる' : '含まれない'}
              />
            
            </FormGroup>
          </FormControl>);
      }}
    />
  );
};