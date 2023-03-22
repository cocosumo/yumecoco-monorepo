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
        if (name.includes('costPrice') && rowIdx === 0) {
          console.log('costPrice', value, Number(value).toLocaleString());
        }

        const currValue = typeof value === 'string' && value === '' 
          ? value 
          : Number(value).toLocaleString(); 
  
        return (
          <OutlinedCurrencyInput
            ref={ref}
            value={currValue}
            name={name}
            onChange={(e) => {
              const rawValue = e.target.value;
              const normalizedValue = convertToHalfWidth(rawValue);
              const newValue = normalizedValue.replace(/,/g, '');
 
              console.log('costPriceOnChange', newValue, e.target.value);

        
              onChange(newValue);
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