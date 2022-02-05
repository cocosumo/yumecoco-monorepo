import { Grid, TextField, FormControl, InputLabel, Select, FormHelperText, MenuItem, SelectChangeEvent } from '@mui/material';
import { useContext } from 'react';
import CustomerFormContext from '../../context/CustomerFormContext';
import { InputChangeType } from '../../types/forms';

type ContactFieldType = 'CHANGE_CONTACT_TEXT' | 'CHANGE_CONTACT_CLASS';

interface ContactFieldProps {
  label: string,
  isRequired?: boolean,
  placeholder?: string,
  contactIdx: number,
  customerIdx: number,
  inputType?: 'tel' | 'email',
  pattern?: string
}

const ContactField = ({
  inputType = 'tel',
  label,
  isRequired = false,
  placeholder = '07014529898',
  customerIdx,
  contactIdx,
} : ContactFieldProps) => {

  const formContext = useContext(CustomerFormContext);
  const customer = formContext!.formState.customers[customerIdx];
  const contact = customer!.contacts[contactIdx];
  const dispatch  = formContext!.dispatch;

  const handleTextChange = (type : ContactFieldType) => (e: InputChangeType | SelectChangeEvent<string>) => {
    dispatch({ type: type, payload: { contactIdx, customerIdx, element: e } });
  };


  const classification = ['契約者', '配偶者', '婚約者', '家「固定電話」', '子', '祖父母', '兄弟姉妹', '同居人', '会社（固定電話）', '法人担当者', 'その他'];
  return (
    <Grid item container p={1} spacing={2}>
      <Grid item md={6} >
        <TextField type={inputType} onBlur={handleTextChange('CHANGE_CONTACT_TEXT')} helperText={contact.errorMsg} error={contact.hasError} fullWidth required={isRequired} label={label} placeholder={placeholder}/>
      </Grid>
      <Grid item md={6}>
        <FormControl required={isRequired} fullWidth>
          <InputLabel>種別</InputLabel>
          <Select
            label="種別"
            value={contact.classification.value}
            onChange={handleTextChange('CHANGE_CONTACT_CLASS')}
          >
            {classification.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}

          </Select>
          <FormHelperText>連絡先の種別を選択してください</FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default ContactField;