import { Controller, useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { NumberCommaField } from 'kokoas-client/src/components/ui/textfield/NumberCommaField';
import { TextFieldProps } from '@mui/material';
import { calculateAmount } from 'libs';


export const ControlledCurrencyInput = ({
  name,
  label,
  variant = 'outlined',
  disabled = false,
  placeholder,
}: {
  name: keyof TypeOfForm,
  label?: string,
  variant?: TextFieldProps['variant']
  disabled?: boolean,
  placeholder?: string,
}) => {


  const { control, getValues, setValue } = useFormContext<TypeOfForm>();

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
        },
        
      }) => {

        return (
          <NumberCommaField
            label={label}
            inputRef={ref}
            value={value as string}
            defaultValue={typeof value === 'number' ? (value as number).toLocaleString() : value}
            name={name}
            variant={variant}
            onChange={(v) => {
              const commaRemoved = typeof v === 'string' ? v.replace(/,/g, '') : v;
              const parsedValue = +commaRemoved;
              onChange(isNaN(parsedValue) ? v : parsedValue);

              const taxRate = getValues('taxRate');
            

              // 逆算
              switch (name) {
                case 'totalContractAmtAfterTax': {
                  const profitRate = getValues('profitRate') / 100;
                  const {
                    amountBeforeTax,
                    profit,
                  } = calculateAmount({
                    amountAfterTax: parsedValue,
                    taxRate,
                    profitRate,
                  });

                  setValue('totalContractAmtBeforeTax', amountBeforeTax || 0);
                  setValue('totalProfit', profit || 0);
                  break;
                }
                case 'totalContractAmtBeforeTax': {
                  const profitRate = getValues('profitRate') / 100;
                  const {
                    amountAfterTax,
                    profit,
                  } = calculateAmount({
                    amountBeforeTax: parsedValue,
                    taxRate,
                    profitRate,
                  });

                  setValue('totalContractAmtAfterTax', amountAfterTax || 0);
                  setValue('totalProfit', profit || 0);
                  break;
                }
                case 'totalProfit': {
                  const totalContractAmtAfterTax = getValues('totalContractAmtAfterTax');
                  const {
                    amountBeforeTax,
                    profitRate,
                  } = calculateAmount({
                    amountAfterTax: totalContractAmtAfterTax,
                    profit: parsedValue,
                    taxRate,
                  });
                  setValue('totalContractAmtBeforeTax', amountBeforeTax || 0);
                  setValue('profitRate', (profitRate || 0) * 100);
                  break;
                }
              }

            }}
            onBlur={onBlur}
            error={!!error}
            disabled={disabled}
            placeholder={placeholder}
            helperText={error?.message}
          />
        );
      }}
    />
  );
};
