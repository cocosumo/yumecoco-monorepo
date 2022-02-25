import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import jaLocale from 'date-fns/locale/ja';
import MuiDatePicker from '@mui/lab/DatePicker';

import { FormControl, FormGroup, FormHelperText, Stack, Box } from '@mui/material';
import BasicSelect from '../selects/BasicSelect';
import { FieldActionType } from '../../../types/form.customer';
import { ElementTarget } from '../../../types/forms';
import YearIcon from '../icons/YearIcon';
import { useState } from 'react';




const monthOptions: Options = [...Array(12)].map((_, i) => ({ value: (i + 1).toString(), label: `${i + 1}月` }));

interface SeparatedDatePickerProps {
  index: number,
  dispatch: (action: FieldActionType) => void,
  value: {
    birthYear: string,
    birthMonth: string,
    birthDay: string
  }
}

type YearErrorState = {
  error: boolean,
  helperText: string
};


const SeparatedDatePicker = (props : SeparatedDatePickerProps) => {
  const { value, dispatch, index } = props;
  const [yearError, setYearError] = useState<YearErrorState>({ error: false, helperText: '' });

  const dayOptions: Options = [...Array(31)].map((_, i) => ({ value: (i + 1).toString(), label: `${i + 1}日` }));

  const handleChange = (e: ElementTarget) => dispatch({ type:'SELECT_CHANGE', payload: { element: e, customerIdx: index } });
  const handleYearChange = (e: Date) => {
    /* Sanitize date here to a string of year because payload.target.value only accepts string. */
    const year = e?.getFullYear().toString() ?? '';
    dispatch({ type:'CHANGE_BIRTHYEAR', payload: { element: { target: { name: 'birthYear', value: year } }, customerIdx: index } });
  };
  const handleYearError = (err : any) => {
    console.log(err);
    switch (err){
      case 'minDate':
      case 'maxDate':
        setYearError({ error: true, helperText: '範囲外の値です。' });
        break;
    }
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={jaLocale}>
      <FormControl>
        <FormGroup>
          <Stack direction="row" spacing={1}>
            <Box minWidth={110}>
              <MuiDatePicker
                views={['year']}
                onError={handleYearError}
                label="生年"
                inputFormat="yyyy"
                disableFuture
                components={                  {
                  OpenPickerIcon: YearIcon,
                }                }
                value={value.birthYear.length === 0 ? null : value.birthYear}
                onChange={handleYearChange}

                renderInput={(params) => <TextField error={yearError.error} helperText={yearError.helperText} fullWidth {...params} />}
              />
            </Box>

            <BasicSelect label="月" name="birthMonth" value={value.birthMonth} options={monthOptions} onChange={handleChange}/>
            <BasicSelect label="日" name="birthDay" value={value.birthDay} options={dayOptions} onChange={handleChange}/>
          </Stack>
        </FormGroup>
        <FormHelperText>{'<任意>個別設定可'}</FormHelperText>
      </FormControl>
    </LocalizationProvider>
  );
};

export default SeparatedDatePicker;

