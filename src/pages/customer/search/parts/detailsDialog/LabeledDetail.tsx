import { Stack, FormLabel, Typography } from '@mui/material';

export const LabeledDetail = (props : {
  label: string,
  value: string
}) => {

  return (
    <>
      {
      props.value &&

      <Stack direction={'row'} spacing={2}>
        <FormLabel>{props.label}</FormLabel>
        <Typography variant='body1'>{props.value}</Typography>
      </Stack>
      }
    </>

  );

};