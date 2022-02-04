import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import jaLocale from 'date-fns/locale/ja';
import MuiDatePicker from '@mui/lab/DatePicker';

import { FormControl, FormGroup, FormHelperText, Stack, Box } from '@mui/material';
import BasicSelect from '../selects/BasicSelect';

const monthOptions: Options = [...Array(12)].map((_, i) => ({ key: i + 1, text: `${i + 1}月` }));

/* TODO: Pass the state up */
interface SeparatedDatePickerProps {
  value: {
    year: string,
    month: string,
    day: string
  },
  handleChange: (date: Date)=>void
}

const SeparatedDatePicker = ({ value, handleChange } : SeparatedDatePickerProps) => {

  const dayOptions: Options = [...Array(31)].map((_, i) => ({ key: i + 1, text: `${i + 1}日` }));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={jaLocale}>
      <FormControl>
        <FormGroup>
          <Stack direction="row" spacing={1}>
            <Box minWidth={150}>
              <MuiDatePicker
                views={['year']}
                label="生年"
                inputFormat="yyyy年"
                value={value.year}
                onChange={handleChange}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Box>

            <BasicSelect label="月" options={monthOptions} />
            <BasicSelect label="日" options={dayOptions} />
          </Stack>
        </FormGroup>
        <FormHelperText>{'<任意>個別設定可'}</FormHelperText>
      </FormControl>
    </LocalizationProvider>
  );
};

export default SeparatedDatePicker;