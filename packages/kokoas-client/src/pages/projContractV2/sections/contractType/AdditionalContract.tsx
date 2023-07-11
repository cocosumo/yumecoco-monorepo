import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

export const choices = [ 
  '追加減額',
  '減額工事',
  'その他',
] as const;

export const AdditionalContract = () => {
  return (
    <FormControl size='small'>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {choices.map(choice => (
          <FormControlLabel
            key={choice}
            value={choice}
            control={<Radio />}
            label={choice}
          />
        ))}

      </RadioGroup>
    </FormControl>
  );
};