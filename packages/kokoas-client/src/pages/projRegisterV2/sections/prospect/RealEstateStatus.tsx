import { 
  FormControl, 
  FormControlLabel, 
  FormLabel, 
  Radio, 
  RadioGroup, 
} from '@mui/material';
import { useTypedFormContext } from '../../hooks';
import { Controller } from 'react-hook-form';
import { realEstateStatus } from 'types';
import { TForm } from '../../schema';


export const RealEstateStatus = () => {

  const {
    control,
  } = useTypedFormContext();
  
  return (
    <Controller 
      control={control}
      name={'realEstateStatus'}
      render={({ 
        field:{
          name,
          value,
          onChange,
          onBlur,
          ref,
        },
        fieldState: { error },
      }) => {
        return (
          <FormControl
            size='small'
            required
            error={!!error}
          >
            <FormLabel id={name}>
              不動産決済
            </FormLabel>
            <RadioGroup
              row
              name={name}
              onChange={(_, newValue) => onChange(newValue as TForm['realEstateStatus'])}
              onBlur={onBlur}
              ref={ref}
              value={value}
              sx={{
                '.MuiTypography-root': {
                  marginRight: 6,
                },
              }}
              
            >
              {realEstateStatus.map((item) => {
                return (
                  <FormControlLabel 
                    key={item}
                    value={item}
                    control={<Radio />}
                    label={item}
                  />
                );

              })}
            </RadioGroup>
          </FormControl>
        );
      }}
    
    
    />
    
  );
};