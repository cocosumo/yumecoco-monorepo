import { FormControl, FormLabel, Stack, TextField } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { JADatePicker } from 'kokoas-client/src/components';

export const ContractDateRange = () => {


  return (
    <FormControl>
      <FormLabel>
        契約日
      </FormLabel>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <JADatePicker
          value={new Date()}
          onChange={()=>{}}
          renderInput={(params) =>(
            <TextField
              {...params}
              variant={'outlined'}
              //name={name}
              //onBlur={() => setTouched(true, true)}
              size={'small'}
              //error={isShowError}
              //helperText={isShowError ? error : ''}
            />)}
        />

        <DoubleArrowIcon color={'inherit'} />
        <JADatePicker
          value={new Date()}
          onChange={()=>{}}
          renderInput={(params) =>(
            <TextField
              {...params}
              variant={'outlined'}
              //name={name}
              //onBlur={() => setTouched(true, true)}
              size={'small'}
              //error={isShowError}
              //helperText={isShowError ? error : ''}
            />)}
        />
      </Stack>
    </FormControl>

  );
};