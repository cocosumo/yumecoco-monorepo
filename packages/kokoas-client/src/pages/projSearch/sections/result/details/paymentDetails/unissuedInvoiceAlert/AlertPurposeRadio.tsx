import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { KAlertPurpose, alertPurposes } from './alertConfig';
import { ChangeEvent } from 'react';

export const AlertPurposeRadio = ({
  value,
  handleChange,
}: {
  value: KAlertPurpose
  handleChange: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
}) => {

  return (
    <FormControl>
      <FormLabel
        id="alert-purpose"
        sx={{
          fontSize: '12px',
        }}
      >
        アラートの目的
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="alert-purpose-radio-group"
        name="alert-purpose-radio-group"
        value={value}
        onChange={handleChange}
        sx={{
          pl: '10px',
        }}
      >
        {Object.keys(alertPurposes).map((purpose: KAlertPurpose) => {
          const label = alertPurposes[purpose];

          return (<FormControlLabel
            value={purpose}
            control={
              <Radio
                size='small'
                sx={{
                  px: '9px',
                  py: '5px',
                }}
              />
            }
            label={label}
            key={label}
                  />);

        })}
      </RadioGroup>
    </FormControl>
  );
};