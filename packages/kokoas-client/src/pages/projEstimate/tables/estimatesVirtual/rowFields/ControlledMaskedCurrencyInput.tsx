import { MaskedCurrencyInput } from 'kokoas-client/src/components';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { getItemsFieldName, KRowFields, TypeOfForm } from '../../../form';

export const ControlledMaskedCurrencyInput = ({
  rowIdx,
  handleChange,
  fieldName,
}: {
  rowIdx: number
  handleChange: () => void,
  fieldName: KRowFields

}) => {

  const { control } = useFormContext<TypeOfForm>();

  const name = getItemsFieldName(rowIdx, fieldName);


  const [
    envStatus,
  ] = useWatch({
    name: [
      'envStatus',
    ],
    control,
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: {
          onBlur,
          onChange,
          value,
        },
        fieldState: {
          isTouched, error,
        },
      }) => (
        <MaskedCurrencyInput
          value={value}
          onChange={(e) => {
            onChange(e);
            handleChange();
          }}
          onBlur={onBlur}
          error={!!error && !!isTouched}
          disabled={!!envStatus}
        />
      )}
    />


  );
};