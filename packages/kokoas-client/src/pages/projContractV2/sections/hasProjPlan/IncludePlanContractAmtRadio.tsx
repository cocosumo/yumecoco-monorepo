import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Stack } from '@mui/system';

export const IncludeContractPlanAmt = () => {
  const { control } = useTypedFormContext();
   
  return (
    <Stack 
      direction={'row'}
      spacing={2}
      alignItems={'center'}
    >
      <Typography fontSize={14}>
        「設計契約金」は含まれますか？
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
              <RadioGroup
                row
                value={value}
                onChange={onChange}
                {...otherFieldProps}
              >
                {(['はい', 'いいえ'] as const).map((label) => {
                
                  return (

                    <FormControlLabel
                      key={label}
                      value={label === 'はい'}
                      control={<Radio />}
                      label={label}
                    />
                  );
                })}

            
              </RadioGroup>
            </FormControl>);
        }}
      />
    </Stack>
  );
};