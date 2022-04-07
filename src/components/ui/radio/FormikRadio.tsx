import { Radio,  RadioGroup, FormControlLabel, FormControl } from '@mui/material';

import { useField } from 'formik';
import { OutlinedDiv } from '../containers/OutlinedDiv';

interface FormikRadioProps {
  name: string,
  label: string,
  choices : readonly string[]
}

export const FormikRadio = (props: FormikRadioProps) => {
  const { choices, label, name } = props;
  const [field] = useField(name);

  return (
    <OutlinedDiv label={label}>
      <FormControl fullWidth>
        {/* <ChoiceContainer> */}
        {/* <FormLabel htmlFor='test'>{label}</FormLabel> */}

        <RadioGroup
        id="test"
        sx={{ justifyContent: 'space-around' }}
        row
        {...field}
      >
          {choices.map(item => <FormControlLabel key={item} value={item} control={<Radio />} label={item}/>)}

        </RadioGroup>
        {/*       </ChoiceContainer> */}
      </FormControl>
    </OutlinedDiv>
  );
};