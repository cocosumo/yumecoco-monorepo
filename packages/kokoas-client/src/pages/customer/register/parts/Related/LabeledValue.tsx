import { Typography } from '@mui/material';

export const LabeledValue = ({
  label,
  value,
}: {
  label: string,
  value: string
}) => {

  return (
    <>
      <Typography sx={{ fontSize: 14 }} color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h6" component="div">
        {value}
      </Typography>
    </>
  );

};