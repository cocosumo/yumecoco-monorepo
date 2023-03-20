import { OutlinedCurrencyInput } from 'kokoas-client/src/components';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { getItemsFieldName, KRowFields, TypeOfForm } from '../../../form';
import { convertToHalfWidth } from 'libs';

export const ControlledCurrencyInput = ({
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
          ref,
          value,
        },
        fieldState: {
          error,
          isTouched,
        },
      }) => {
        return (
          <OutlinedCurrencyInput
            ref={ref}
            defaultValue={value.toLocaleString}
            name={name}
            onChange={(e) => {
              const newValue = e.target.value;
              const halfWidth = convertToHalfWidth(newValue);
              onChange(halfWidth);
              handleChange();
            }}
            onBlur={onBlur}
            error={!!error && isTouched}
            disabled={!!envStatus}
          />
        );
      }}
    />


  );
};