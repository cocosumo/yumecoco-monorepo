import { Stack, FormLabel, Typography, StackProps } from '@mui/material';

export const LabeledDetail = ({
  value,
  label,
  direction = 'row',
} : {
  label: string,
  value?: string
  direction?: StackProps['direction']
}) => {

  return (
    <div>
      {
      value &&

      <Stack direction={direction} spacing={direction === 'row' ? 2 : 0} >
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