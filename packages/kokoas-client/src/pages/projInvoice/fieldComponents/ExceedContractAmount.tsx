import { Alert, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useField } from 'formik';

export const ExceedContractAmount = () => {

  const [, , helpers] = useField('exceedChk');
  const {
    setValue,
  } = helpers;
  const handleCheck = (e: any) => {
    setValue(e.target.checked);
  };

  return (
    <Alert severity="warning" icon={false}>
      <Stack direction={'row'}>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              onClick={handleCheck}
            />
          }
          label="承諾済"
          sx={{
            width: 100,
          }}
        />
        <Typography
          color={'red'}
        >
          契約金額を超過しています。
          <br />
          お客さまより承諾を得ていますか？
        </Typography>
      </Stack>
    </Alert>
  );
};