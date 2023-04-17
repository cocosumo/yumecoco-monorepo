import { useField } from 'formik';
import { NumberCommaField, NumberCommaFieldProps } from './NumberCommaField';

export const FormikMoneyField2 = (props: Omit<NumberCommaFieldProps, 'value' | 'onChange'>) => {
  const {
    name,
    helperText,
    fullWidth,
    ref : _ref,
    ...others
  } = props;

  const [field, meta, helpers] = useField(name ?? '');
  const {
    value,
  } = field;
  const {
    touched,
    error,

  } = meta;
  const {
    setValue,
    setTouched,
  } = helpers;
  const isShowError = touched && !!error;

  return (
    <NumberCommaField
      {...others}
      name={name}
      value={value}
      onChange={(e) => {
        setValue(e);
      }}
      onBlur={()=>{
        setTouched(true);
      }}
      error={isShowError}
      helperText={error || helperText}
      fullWidth={fullWidth}
    />
  );
};