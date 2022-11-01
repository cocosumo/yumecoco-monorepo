import { InputAdornment } from '@mui/material';
import { ComponentProps } from 'react';
import { FormikNumberField } from './FormikNumberField';
import { FormikTextFieldV2 } from './FormikTextFieldV2';

export const FormikMoneyField = (props: ComponentProps<typeof FormikTextFieldV2>) => {
  const {
    InputProps,
    ...others
  } = props;
  return (
    <FormikNumberField
      {...others}
      InputProps={{
        ...InputProps,
        endAdornment: (
          <InputAdornment position='end'>
            {'円'}
          </InputAdornment>
        ),
      }}
    />
  );
};