import { FormLabel, Grid, Stack, Typography } from '@mui/material';

export const DisplayAmount = ({
  label,
  amount,
}: {
  label: string
  amount: number | undefined
}) => {


  return (
    <Stack spacing={2} alignItems={'center'} direction={'row'}>
      <Grid item xs={12} md={6}>
        <FormLabel>
          {label}
        </FormLabel>
      </Grid>
      <Grid item xs={12} md={6}>
        {!!amount &&
          <Typography sx={{ textAlign: 'right' }}>
            {`${Math.round(amount).toLocaleString()} 円`}
          </Typography>}
        {!amount &&
          <Typography sx={{ textAlign: 'right' }}>
            {'--- 円'}
          </Typography>}
      </Grid>
    </Stack>
  );
};