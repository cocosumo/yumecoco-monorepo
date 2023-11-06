import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { FormControl, FormControlLabel, Radio, RadioGroup, Tooltip, tooltipClasses } from '@mui/material';
import { ChoiceTooltip } from './ChoiceTooltip';

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
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              value={value}
              row
              onChange={onChange}
              {...otherFieldProps}
            >
              {
              (['はい', 'いいえ'] as const).map((label) => {

                
                return (
                  <Tooltip
                    key={label}
                    title={<ChoiceTooltip label={label} />} 
                    placement={'top'}
                    sx={{
                      [`& .${tooltipClasses.tooltip}`]:{
                        maxWidth: 500,
                      },
                    }}
                  >
             
                    <FormControlLabel
                      value={label === 'はい'}
                      control={<Radio />}
                      label={label === 'はい' ? '含まれる' : '含まれない'}
                    />
                  </Tooltip>
                );
              })
            }
            </RadioGroup>
          </FormControl>);
      }}
    />
  );
};