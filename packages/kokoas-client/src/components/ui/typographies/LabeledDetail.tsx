import { Stack, FormLabel, Typography, StackProps } from '@mui/material';



export const LabeledDetail = ({
  value,
  label,
  direction = 'row',
  ...otherStackProps
} : StackProps & {
  label: string,
  value?: string
}) => {

  return (
    <div>
      {
      value &&

      <Stack
        {...otherStackProps}
        direction={direction}
        spacing={direction === 'row' ? 2 : 0}
      >
        <FormLabel sx={{ width: '100px' }}>
          {label}
        </FormLabel>
        <Typography variant='body1'>
          {value || ''}
        </Typography>
      </Stack>
      }
    </div>

  );

};