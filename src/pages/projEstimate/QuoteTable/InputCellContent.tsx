import { FormControl, FormHelperText, Input } from '@mui/material';
import { useField } from 'formik';


export type InputCellContentProps = {
  name: string,
  /* value: string, */
};

const InputCellContent = (props : InputCellContentProps) => {
  const [field, meta] = useField(props);
  const { error, touched } = meta;
  
  return (
    <FormControl variant="standard">
      <Input {...field} error={!!error && touched} />
      {(!!error && touched) &&
      <FormHelperText error={!!error && touched}>
        {error}
      </FormHelperText>}
    </FormControl>
  );
};

export default InputCellContent;