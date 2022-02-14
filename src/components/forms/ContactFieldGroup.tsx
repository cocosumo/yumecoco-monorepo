import { Grid, TextField, FormControl, InputLabel, Select, FormHelperText, MenuItem } from '@mui/material';
import { useContext } from 'react';
import CustomerFormContext from '../../context/CustomerFormContext';
import {  ContactPayload, HandleFieldChangeFunc } from '../../types/forms';


// type ContactFieldType = 'CHANGE_CONTACT_TEXT' | 'CHANGE_CONTACT_CLASS';


interface CustomerFieldProps {
  custIdx : number,
  contactIdx: number
}


const ContactFieldGroup = ({
  custIdx,
  contactIdx,
} : CustomerFieldProps) => {

  const formContext = useContext(CustomerFormContext);
  const dispatch = formContext!.dispatch;
  const contactRow = formContext!.formState.customers[custIdx].contacts[contactIdx];
  const cVal = contactRow.contactValue;
  const cClass = contactRow.classification;


  const handleValueChange  = (fieldName: ContactPayload['fieldName']) : HandleFieldChangeFunc=> (e) => {

    dispatch({ type:'CHANGE_CONTACT_VALUE', payload: { customerIdx: custIdx, fieldName: fieldName, contactIdx: contactIdx, value: e.target.value } });
  };


  const classificationOptions = ['契約者', '配偶者', '婚約者', '家「固定電話」', '子', '祖父母', '兄弟姉妹', '同居人', '会社（固定電話）', '法人担当者', 'その他'];

  return (
    <Grid item container p={1} spacing={2}>
      <Grid item md={6} >
        <TextField type={cVal.inputType} onBlur={handleValueChange('contactValue')} helperText={cVal.helperText} error={cVal.hasError} fullWidth required={cVal.isRequired} label={cVal.label} />
      </Grid>
      <Grid item md={6}>
        <FormControl error={cClass.hasError} required={cClass.isRequired} fullWidth>
          <InputLabel error={cClass.hasError}>{cClass.label}</InputLabel>
          <Select
            label={cClass.label}
            value={cClass.value}
            error={cClass.hasError}
            onChange={handleValueChange('classification')}
          >
            {classificationOptions.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}

          </Select>
          <FormHelperText>連絡先の{cClass.label}を選択してください</FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default ContactFieldGroup;