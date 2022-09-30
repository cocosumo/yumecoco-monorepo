import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { KeyOfForm, TypeOfForm } from '../../form';

export const PaymentFieldChk = ({
  label, name,
}: {
  name: string,
  label: string,
}) => {
  const { setValues, values } = useFormikContext<TypeOfForm>();
  const [field] = useField(`${name}_chk`);
  const { value } = field;

  const handleChk: CheckboxProps['onChange'] = (event) => {
    const isChecked = event.target.checked;

    setValues(prev => ({
      ...prev,
      [`${name}_chk`]: isChecked,
      [`${name}_amt`]: isChecked ? prev[`${name}_amt` as KeyOfForm] : 0,
      [`${name}_date`]: isChecked ? prev[`${name}_date` as KeyOfForm] : '',
    }));

  };

  return (
    <FormControlLabel
      label={label}
      control={(
        <Checkbox
          onChange={handleChk}
          checked={value}
          sx={{
            transform: 'scale(1.5)',
          }}
        />)}
    />
  );
};