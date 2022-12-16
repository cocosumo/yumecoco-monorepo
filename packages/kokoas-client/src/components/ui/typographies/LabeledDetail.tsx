import { Stack, FormLabel, Typography, StackProps } from '@mui/material';
import { TypographyProps } from '@mui/system';



export const LabeledDetail = ({
  value,
  label,
  direction = 'row',
  justifyContent = 'space-between',
  typographyProps,
  ...otherStackProps
} : StackProps & {
  label: string,
  value?: string,
  typographyProps?: TypographyProps
}) => {

  return (
    <>
      {
      value &&

      <Stack
        {...otherStackProps}
        width={'100%'}
        direction={direction}
        justifyContent={justifyContent}
        spacing={direction === 'row' ? 2 : 0}
      >
        <FormLabel sx={{ minWidth: '100px' }}>
          {label}
        </FormLabel>
        <Typography {...typographyProps}>
          {value || ''}
        </Typography>
      </Stack>
      }
    </>

  );

};