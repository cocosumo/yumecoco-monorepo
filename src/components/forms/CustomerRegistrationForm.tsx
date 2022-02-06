import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Box,
} from '@mui/material';

import { useContext } from 'react';
import CustomerFormContext from '../../context/CustomerFormContext';
import SeparatedBirthDatePicker from '../ui/datetimepickers/SeparatedBirthDatePicker';
import CustomerField from '../ui/textfield/CustomerField';
import { ElementTarget } from './../../types/forms';
import ContactFieldGroup from './ContactFieldGroup';



interface CustomerRegistrationFormProps {
  isLinkedCustomer : boolean
  index: number
}



export default function CustomerRegistrationForm({ isLinkedCustomer, index } : CustomerRegistrationFormProps) {

  const formContext = useContext(CustomerFormContext);
  const dispatch  = formContext!.dispatch;
  const formState = formContext!.formState;
  

  const componentIdx = index || 0;

  const customer = formState.customers[index];

  const { isSameAsMain } = customer;

  const isHideDetails = isLinkedCustomer && isSameAsMain;

  const handleFieldChange = (e: ElementTarget)  => dispatch({ type: 'CHANGE', payload: { element: e, customerIdx: index } });
  const handleContactFieldChange = (e: ElementTarget)  => dispatch({ type: 'CHANGE_CONTACT_TEXT', payload: { element: e, customerIdx: index } });

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomerField fieldname='fullName' customer={customer} handleFieldChange={handleFieldChange} />
        </Grid>
        <Grid item xs={12}>
          <CustomerField fieldname='fullNameReading' customer={customer} handleFieldChange={handleFieldChange} />
        </Grid>
        <Grid item xs={12} md={4} mb={4}>
          <FormControl fullWidth>
            <InputLabel>性別</InputLabel>
            <Select name="gender" label="性別" value={customer.gender.value} onChange={handleFieldChange}>
              <MenuItem value={'女性'}>女性</MenuItem>
              <MenuItem value={'男性'}>男性</MenuItem>
              <MenuItem value={'指定しない'}>指定しない</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8}>
          <SeparatedBirthDatePicker dispatch={dispatch} value={{
            birthYear: customer.birthYear.value,
            birthMonth: customer.birthMonth.value,
            birthDay: customer.birthDay.value,
          }} index={componentIdx} />
        </Grid>
        {isLinkedCustomer &&
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox checked={isSameAsMain} onClick={()=>dispatch({ type:'SET_SAME_AS_MAIN', payload: { customerIdx: index } })} />}
            label="住所と連絡先は【契約者１】と同じ"
          />
        </Grid>
        }

        {!isHideDetails &&
        <>
          <Grid item xs={12} >
            <TextField  name="postal" helperText={customer.postal.errorMsg} error={customer.postal.hasError} onBlur={handleFieldChange} label="郵便番号" placeholder="441-8124" required={customer.postal.isRequired} />
          </Grid>
          <Grid item xs={12}>
            <TextField name="address1" helperText={customer.address1.errorMsg} error={customer.address1.hasError} onBlur={handleFieldChange}  fullWidth label="住所" placeholder="愛知県豊川" required={customer.postal.isRequired} />
          </Grid>
          <Grid item xs={12} mb={4}>
            <TextField name="address2" helperText={customer.address2.errorMsg} error={customer.address2.hasError} onBlur={handleFieldChange} fullWidth label="住所（番地以降）" placeholder="１９番地１６　６１２" required={customer.postal.isRequired} />
          </Grid>

          <ContactFieldGroup fieldname='tel1' customer={customer} handleFieldChange={handleContactFieldChange}/>
          <ContactFieldGroup fieldname='tel2' customer={customer} handleFieldChange={handleContactFieldChange}/>
          <ContactFieldGroup fieldname='email' customer={customer} handleFieldChange={handleContactFieldChange}/>
        </>
        }
      </Grid>

    </Box>

  );
}