import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../../hooks/useTypedHooks';
import { OutlinedMoneyInput } from 'kokoas-client/src/components/reactHookForm';
import { KForm } from '../../../schema';

export const ControlledAmountField = ({
  name,
}: {
  name: KForm
}) => {
  const {
    control,
  } = useTypedFormContext();
  
  
  return (
    <Controller 
      name={name}
      control={control}
      render={({
        field,
        fieldState: {
          isTouched,
          isDirty,
          error,
        },
      }) => {
        const showError = !!error?.message && (isTouched || isDirty);

        return (
          <OutlinedMoneyInput
            fullWidth
            error={showError}
            type='number'
            {...field}            
          />
        );
      }}
    />
  );
};