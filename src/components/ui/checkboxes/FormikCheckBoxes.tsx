import { Checkbox,  FormControlLabel, FormControl, FormGroup } from '@mui/material';

//import { useField } from 'formik';
import { OutlinedDiv } from '../containers/OutlinedDiv';

interface FormikRadioProps {
  name: string,
  label: string,
  choices : readonly string[]
}

export const FormikCheckBoxes = (props: FormikRadioProps) => {
  const { choices, label } = props;
  //const [field] = useField(name);

  return (
    <OutlinedDiv label={label}>
      <FormControl fullWidth>
        <FormGroup
          sx={{ justifyContent: 'space-around' }}
          row
        >
          {choices.map(item => (
            <FormControlLabel key={item} value={item} control={<Checkbox />} label={item}/>
          ))}
        </FormGroup>
      </FormControl>
    </OutlinedDiv>
  );
};