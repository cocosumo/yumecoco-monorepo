
import { CustomerBasicInformation, InputField, HandleFieldChangeFunc } from './../../../types/forms';
import TextField from '@mui/material/TextField';

interface CustomerFieldProps {
  customer: CustomerBasicInformation,
  fieldname: string,
  handleFieldChange: HandleFieldChangeFunc
}

const CustomerField : React.FC<CustomerFieldProps> = (props) => {
  const { fieldname, customer, handleFieldChange } = props;

  const cust = customer[fieldname] as InputField;
  

  return (
    <TextField name={fieldname} helperText={cust.errorMsg} error={cust.hasError} onBlur={handleFieldChange} fullWidth label="氏名" placeholder="高橋 加奈" required={cust.isRequired} />

  );

};

export default CustomerField;