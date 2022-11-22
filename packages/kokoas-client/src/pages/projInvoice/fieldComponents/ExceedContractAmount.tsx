import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
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
    <Box
      component="span"
      sx={{ p: 2, border: 'none' }}
    >
      <Stack direction={'row'}>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              onClick={handleCheck}
            />
        }
          label="承諾済"
        />
        <Typography color={'red'}>
          契約金額を超過しています。
          <br />
          お客さまより承諾を得ていますか？
        </Typography>
      </Stack>
    </Box>
  );
};