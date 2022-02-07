
import { CustomerBasicInformation, InputField, HandleFieldChangeFunc } from './../../../types/forms';
import TextField from '@mui/material/TextField';
import useCustomerFieldState from '../../../hooks/useCustomerFieldState';

interface CustomerFieldProps {
  customer: CustomerBasicInformation,
  fieldname: string,
  handleFieldChange: HandleFieldChangeFunc
}

const CustomerField : React.FC<CustomerFieldProps> = (props) => {
  const { fieldname, customer, handleFieldChange } = props;
  const cust = customer[fieldname] as InputField;
  const { hasError } = useCustomerFieldState(cust);

  return (
    <TextField name={fieldname} helperText={cust.helperText} error={hasError} onBlur={handleFieldChange} fullWidth label={cust.label} placeholder={cust.placeholder} required={cust.isRequired} />

  );

};

export default CustomerField;