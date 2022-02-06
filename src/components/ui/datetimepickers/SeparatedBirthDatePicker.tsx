import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import jaLocale from 'date-fns/locale/ja';
import MuiDatePicker from '@mui/lab/DatePicker';

import { FormControl, FormGroup, FormHelperText, Stack, Box } from '@mui/material';
import BasicSelect from '../selects/BasicSelect';
import { ElementTarget, FieldActionType } from '../../../types/forms';
import YearIcon from '../icons/YearIcon';




const monthOptions: Options = [...Array(12)].map((_, i) => ({ key: i + 1, text: `${i + 1}月` }));

interface SeparatedDatePickerProps {
  index: number,
  dispatch: (action: FieldActionType) => void,
  value: {
    birthYear: string,
    birthMonth: string,
    birthDay: string
  }
}


const SeparatedDatePicker = (props : SeparatedDatePickerProps) => {
  const { value, dispatch, index } = props;

  const dayOptions: Options = [...Array(31)].map((_, i) => ({ key: i + 1, text: `${i + 1}日` }));
 
  const handleChange = (e: ElementTarget) => dispatch({ type:'SELECT_CHANGE', payload: { element: e, customerIdx: index } });
  const handleYearChange = (e: Date) => {
    /* Sanitize date here to a string of year because payload.target.value only accepts string. */
    const year = e !== null ? e.getFullYear().toString() : ''; 
    dispatch({ type:'CHANGE_BIRTHYEAR', payload: { element: { target: { name: 'birthYear', value: year } }, customerIdx: index } });
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={jaLocale}>
      <FormControl>
        <FormGroup>
          <Stack direction="row" spacing={1}>
            <Box minWidth={110}>
              <MuiDatePicker
                views={['year']}
                label="生年"
                inputFormat="yyyy"
                maxDate={new Date()}
                components={                  {
                  OpenPickerIcon: YearIcon,
                }                }
                value={value.birthYear.length === 0 ? null : value.birthYear}
                onChange={handleYearChange}
              
                renderInput={(params) => <TextField error={false} fullWidth {...params} />}
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