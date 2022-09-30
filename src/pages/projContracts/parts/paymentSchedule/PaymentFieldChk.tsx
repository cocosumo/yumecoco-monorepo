import { Checkbox, FormControlLabel } from '@mui/material';
import { useField } from 'formik';

export const PaymentFieldChk = ({
  label, name,
}: {
  name: string,
  label: string,
}) => {
  const [field,,helpers] = useField(`${name}_chk`);
  const { value } = field;
  const { setValue } = helpers;

  return (
    <FormControlLabel
      label={label}
      control={(
        <Checkbox
          onChange={(event) => {setValue(event.target.checked);}}
          checked={value}
          sx={{
            transform: 'scale(1.5)',
          }}
        />)}
    />
  );
};