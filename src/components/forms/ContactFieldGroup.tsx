import { Grid, TextField, FormControl, InputLabel, Select, FormHelperText, MenuItem } from '@mui/material';


import {  CustomerBasicInformation, HandleFieldChangeFunc } from '../../types/forms';


// type ContactFieldType = 'CHANGE_CONTACT_TEXT' | 'CHANGE_CONTACT_CLASS';


interface CustomerFieldProps {
  customer: CustomerBasicInformation,
  fieldname: string,
  handleFieldChange: (isClassification: boolean) => HandleFieldChangeFunc
}

const ContactField = ({
  fieldname,
  customer,
  handleFieldChange,
} : CustomerFieldProps) => {


  const contact = customer.contacts[fieldname];

  const classification = ['契約者', '配偶者', '婚約者', '家「固定電話」', '子', '祖父母', '兄弟姉妹', '同居人', '会社（固定電話）', '法人担当者', 'その他'];
  return (
    <Grid item container p={1} spacing={2}>
      <Grid item md={6} >
        <TextField name={fieldname} type={contact.inputType} onBlur={handleFieldChange(false)} helperText={contact.helperText} error={contact.hasError} fullWidth required={contact.isRequired} label={contact.label} />
      </Grid>
      <Grid item md={6}>
        <FormControl required={contact.isRequired} fullWidth>
          <InputLabel>種別</InputLabel>
          <Select
            label="種別"
            name={ fieldname }
            value={contact.classification.value}
            onChange={handleFieldChange(true)}
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