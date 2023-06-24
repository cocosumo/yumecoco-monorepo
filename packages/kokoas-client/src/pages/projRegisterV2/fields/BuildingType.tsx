import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../form';
import { buildingTypes } from 'types';

export const BuildingType = () => {
  const { control } = useFormContext<TypeOfForm>();

  return (
    <Controller
      name={'buildingType'}
      control={control}
      render={({
        field: {
          onChange,
          value,
          ...otherFieldProps
        },
        fieldState: {
          error,
          isTouched,
        },
      }) => {
        const isShowError = isTouched && !!error;
        return (
          <FormControl 
            error={isShowError}
            sx={{
              bgcolor: 'background.paper',
              p: 1,
              px: 2,
              border: '1px solid #ced4da',
              borderRadius: 1,
            }}
          >
            <FormLabel>
              {'建物種別'}
            </FormLabel>
            { isShowError && (
            <FormHelperText>
              {error.message}
            </FormHelperText>
            )}
            <RadioGroup
              {...otherFieldProps}
              onChange={(_, newValue) => {
                onChange(newValue);
              }}
              value={value}
              row
            >
              {buildingTypes.map(pM => (
                <FormControlLabel
                  key={pM}
                  value={pM}
                  control={<Radio />}
                  label={pM}
                />
              ))}
              
              
            </RadioGroup>


          </FormControl>
        );
      }}
    />
  );
};