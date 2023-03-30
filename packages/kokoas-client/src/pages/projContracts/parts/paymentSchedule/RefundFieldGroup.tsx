import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { ComponentProps } from 'react';
import { getFieldName, TypeOfForm } from '../../form';
import { RefundAmt } from './RefundAmt';

/**
 * 返金
 * @returns jsx
 */
export const RefundFieldGroup = ({
  disabled = false,
}: {
  disabled?: boolean
}) => {
  const { setValues } = useFormikContext<TypeOfForm>();
  const [field] = useField(getFieldName('hasRefund'));
  const { value: chkValue } = field;


  const handleChange: ComponentProps<typeof Checkbox>['onChange'] = (_, checked) => {

    setValues((prev) => ({
      ...prev,
      hasRefund: checked,
      refundAmt: checked ? prev.refundAmt : '',
    }));

  };

  return (
    <Stack direction={'row'} justifyContent={'space-between'}>
      <FormControlLabel
        label={'返金有'}
        control={(
          <Checkbox
            onChange={handleChange}
            checked={chkValue}
            sx={{
              transform: 'scale(1.5)',
            }}
          />)}
        disabled={disabled}
      />

      <RefundAmt disabled={!chkValue || disabled} />
    </Stack>
  );
};