import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { subsidyMethods } from '../../form';

const label = {
  0: '工事に含む',
  1: '顧客に返金',
};

export const SubsidyMethod = (
  { 
    disabled, 
  }: {
    disabled: boolean
  }) => {
  return (
    <FormControl disabled={disabled}>
      <RadioGroup row>
        {subsidyMethods
          .map((value) => (
            <FormControlLabel 
              key={value} 
              value={value} 
              control={<Radio />}
              label={label[value]}
              sx={{ mr: 0, ml: 1 }}
            /> 
          ))}
      </RadioGroup>
    </FormControl>);
};