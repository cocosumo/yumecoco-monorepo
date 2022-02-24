
import { CustomerBasicInformation, HandleFieldChangeFunc } from '../../../types/form.customer';
import { InputField } from '../../../types/forms';
import TextField from '@mui/material/TextField';
import useCustomerFieldState from '../../../hooks/useCustomerFieldState';
import { useEffect, useState } from 'react';

interface CustomerFieldProps {
  customer: CustomerBasicInformation,
  fieldname: string,
  handleFieldChange: HandleFieldChangeFunc
}

const CustomerField : React.FC<CustomerFieldProps> = (props) => {

  const { fieldname, customer, handleFieldChange } = props;
  const cust = customer[fieldname] as InputField;
  const { hasError } = useCustomerFieldState(cust);
  const [value, setValue] = useState('');

  useEffect(()=> setValue(cust.value), [cust.value]);

  return (
    <TextField value={value} name={fieldname} helperText={cust.helperText} error={hasError} onBlur={handleFieldChange} fullWidth label={cust.label} placeholder={cust.placeholder} required={cust.isRequired} onChange={(e)=>setValue(e.target.value)} />

  );

};

export default CustomerField;