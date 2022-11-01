import { ComponentProps } from 'react';
import { FormikTextFieldV2 } from './FormikTextFieldV2';

export const FormikNumberField = (props: ComponentProps<typeof FormikTextFieldV2>) => {
  const {
    InputProps,
    ...others
  } = props;

  return (
    <FormikTextFieldV2
      {...others}
      type="number"
      InputProps={{
        ...InputProps,
        inputProps: { style: { textAlign: 'right' } },
      }}
    />
  );
};