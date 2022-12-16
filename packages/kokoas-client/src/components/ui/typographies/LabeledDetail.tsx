import { Stack, FormLabel, Typography, StackProps } from '@mui/material';
import { ComponentProps } from 'react';



export const LabeledDetail = ({
  value,
  label,
  direction = 'row',
  justifyContent = 'space-between',
  typographyProps,
  labelProps,
  ...otherStackProps
} : StackProps & {
  label: string,
  value?: string,
  typographyProps?: ComponentProps<typeof Typography>,
  labelProps?: ComponentProps<typeof FormLabel>
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
        <FormLabel
          {...labelProps}
          sx={{
            ...labelProps?.sx,
            minWidth: '100px',
          }}
        >
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