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
  FormHelperText,
} from '@mui/material';

import { useContext, useState } from 'react';
import CustomerFormContext from '../../context/CustomerFormContext';
import SeparatedDatePicker from '../ui/datetimepickers/SeparatedDatePicker';


interface ContactFieldProps {
  label: string,
  isRequired?: boolean,
  placeholder?: string
}

interface CustomerRegistrationFormProps {
  isLinkedCustomer : boolean
  index: number
}

const ContactField = ({
  label,
  isRequired = false,
  placeholder = '07014529898',
} : ContactFieldProps) => {


  const classification = ['契約者', '配偶者', '婚約者', '家「固定電話」', '子', '祖父母', '兄弟姉妹', '同居人', '会社（固定電話）', '法人担当者', 'その他'];
  return (
    <Grid item container p={1} spacing={2}>
      <Grid item md={6} >
        <TextField fullWidth required={isRequired} label={label} placeholder={placeholder} />
      </Grid>
      <Grid item md={6}>
        <FormControl fullWidth>
          <InputLabel>種別</InputLabel>
          <Select
            label="種別"
          >
            {classification.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}

          </Select>
          <FormHelperText>連絡先の種別を選択してください</FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default function CustomerRegistrationForm({ isLinkedCustomer, index } : CustomerRegistrationFormProps) {

  const [isSameToMain, setIsSameToMain] = useState(true);
  const formContext = useContext(CustomerFormContext);
  const dispatch  = formContext!.dispatch;
  const formState = formContext!.formState;
  const isHideDetails = isLinkedCustomer && isSameToMain;

  const componentIdx = index || 0;

  const customer = formState.customers[index];



  console.log(isLinkedCustomer);
  return (

    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField name="fullName" helperText={customer.fullName.errorMsg} error={customer.fullName.hasError} onBlur={(e)=>dispatch({ type: 'CHANGE', payload: e, index: componentIdx })} fullWidth label="氏名" placeholder="高橋 加奈" required/>
        </Grid>
        <Grid item xs={12}>
          <TextField name="fullNameReading" error={customer.fullNameReading.hasError} onBlur={(e)=>dispatch({ type: 'CHANGE', payload: e, index: componentIdx })} fullWidth required label="氏名フリガナ" />
        </Grid>
        <Grid item xs={12} md={4} mb={4}>
          <FormControl fullWidth>
            <InputLabel>性別</InputLabel>
            <Select name="gender" label="性別" value={customer.gender.value} onChange={(e)=>dispatch({ type: 'SELECT_CHANGE', payload: e, index: componentIdx })}>
              <MenuItem value={'女性'}>女性</MenuItem>
              <MenuItem value={'男性'}>男性</MenuItem>
              <MenuItem value={'指定しない'}>指定しない</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8}>
          <SeparatedDatePicker value={{
            year: customer.birthYear.value,
            month: customer.birthMonth.value,
            day: customer.birthDay.value,
          }}  handleChange={(e) => dispatch({ type:'CHANGE_BIRTHDATE', payload: e, index: componentIdx })}/>
        </Grid>
        {isLinkedCustomer &&
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox checked={isSameToMain} onClick={()=>setIsSameToMain(prev=> !prev)} />}
            label="住所と連絡先は【契約者１】と同じ"
          />
        </Grid>
        }

        {!isHideDetails &&
        <>
          <Grid item xs={12} >
            <TextField required label="郵便番号" placeholder="441-8124" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth required label="住所" placeholder="愛知県豊川" />
          </Grid>
          <Grid item xs={12} mb={4}>
            <TextField fullWidth required label="住所（番地以降）" placeholder="１９番地１６　６１２" />
          </Grid>

          <ContactField label="電話番号１" isRequired />
          <ContactField label="電話番号2" />
          <ContactField label="メール" placeholder="cocosumo.rpa03@gmail.com" />
        </>
        }
      </Grid>

    </Box>

  );
}