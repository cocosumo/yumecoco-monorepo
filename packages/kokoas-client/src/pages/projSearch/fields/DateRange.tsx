import { FormGroup, FormLabel, IconButton, TextField } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
import { JADatePicker } from 'kokoas-client/src/components';

const CustomButton = ({ label }: { label: string }) => (
  <IconButton size='small'>
    {label}
  </IconButton>
);

const From = () => <CustomButton label={'から'} />;
const Until = () => <CustomButton label={'まで'} />;

/**
 * TODO:
 * 
 * 絞り込み項目が明確になったら、
 * リファクタリングする
 * 
 */
export const DateRange = ({
  label,
}:{
  label: string
}) => {
  return (
    <FormGroup>
      <FormLabel 
        sx={{
          mb: 1,
        }}
      >
        {label}
      </FormLabel>
   
      <Grid container spacing={2}>
        <Grid xs>
          <JADatePicker
            components={{
              OpenPickerIcon: From,
            }}
            onChange={() => {}}
            value={null} // keep it controlled
            renderInput={(params) =>(
              <TextField
                {...params}
                fullWidth
                variant={'outlined'}
                size={'small'}
              />)}
          />
        </Grid>

        <Grid xs>
          <JADatePicker
            components={{
              OpenPickerIcon: Until,
            }}
            onChange={() => {}}
            value={null} // keep it controlled
            renderInput={(params) =>(
              <TextField
                {...params}
                fullWidth
                variant={'outlined'}
                size={'small'}
              />)}
          />
        </Grid>
   
      </Grid>

    </FormGroup>
  );
};