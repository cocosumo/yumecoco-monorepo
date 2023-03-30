import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { TypeOfForm, getFieldName } from '../../form';
import { ComponentProps } from 'react';
import produce from 'immer';
import { SubsidyAmt } from './SubsidyAmt';
import { SubsidyMethod } from './SubsidyMethod';

const fieldName = getFieldName('hasSubsidy');

export const SubsidyFieldGroup = ({
  disabled,
}: {
  disabled: boolean
}) => {
  const { setValues } = useFormikContext<TypeOfForm>();
  const [field] = useField(fieldName);
  const { value: chkValue } = field;


  const handleChange: ComponentProps<typeof Checkbox>['onChange'] = (_, checked) => {

    setValues((prev) => produce(prev, (draft) => {
      draft.hasSubsidy = checked;
      draft.subsidyAmt = checked ? draft.subsidyAmt : '';
    }));

  };

  return (
    <Stack direction={'row'} justifyContent={'space-between'}>
      <FormControlLabel
        label={'補助金'}
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

      <SubsidyAmt disabled={disabled} />
      <SubsidyMethod disabled={disabled} />
    </Stack>
  );
};
