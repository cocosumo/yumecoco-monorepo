import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { getItemsFieldName, KRowFields, TypeOfForm } from '../../../form';
import { NumberCommaField } from 'kokoas-client/src/components/ui/textfield/NumberCommaField';

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
      name,
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
          <NumberCommaField
            value={value}
            inputRef={ref}
            type='text' // numberだと、コンマを入れることが出来ない
            size='small' 
            defaultValue={value.toLocaleString()}
            name={name}
            onChange={(v) => {
              onChange(v);
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