import { Controller } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { NumberCommaField } from 'kokoas-client/src/components/ui/textfield/NumberCommaField';
import { Box, TextFieldProps } from '@mui/material';
import { calculateAmount } from 'libs';
import { useFormContextExtended } from '../hooks/useFormContextExtended';
import { ReactNode } from 'react';


export const ControlledCurrencyInput = ({
  name,
  label,
  variant = 'outlined',
  disabled = false,
  placeholder,
  startAdornment,
}: {
  name: keyof TypeOfForm,
  label?: string,
  variant?: TextFieldProps['variant']
  disabled?: boolean,
  placeholder?: string,
  startAdornment?: ReactNode,
}) => {


  const {
    setRoundedValue,
    control,
    getValues,
  } = useFormContextExtended();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: {
          onChange,
          ref,
          value,
        },
        fieldState: {
          error,
        },

      }) => {

        return (
          <Box width={260}>
            <NumberCommaField
              label={label}
              inputRef={ref}
              value={value as string}
              defaultValue={typeof value === 'number' ? (value as number).toLocaleString() : value}
              name={name}
              variant={variant}
              size='small'
              fullWidth
              inputProps={{ style: { 
                color: value as number >= 0 ? 'black' : 'orange', 
              } }}
              startAdornment={startAdornment}
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
                      costPrice,
                    } = calculateAmount({
                      amountAfterTax: parsedValue,
                      taxRate,
                      profitRate,
                    });

                    setRoundedValue('totalContractAmtBeforeTax', amountBeforeTax);
                    setRoundedValue('totalProfit', profit);
                    setRoundedValue('costPrice', costPrice);
                    break;
                  }
                  case 'totalContractAmtBeforeTax': {
                    const profitRate = getValues('profitRate') / 100;
                    const {
                      amountAfterTax,
                      profit,
                      costPrice,
                    } = calculateAmount({
                      amountBeforeTax: parsedValue,
                      taxRate,
                      profitRate,
                    });

                    setRoundedValue('totalContractAmtAfterTax', amountAfterTax);
                    setRoundedValue('totalProfit', profit);
                    setRoundedValue('costPrice', costPrice);
                    break;
                  }
                  case 'totalProfit': {
                    const totalContractAmtAfterTax = getValues('totalContractAmtAfterTax');
                    const {
                      amountBeforeTax,
                      profitRate,
                      costPrice,
                    } = calculateAmount({
                      amountAfterTax: totalContractAmtAfterTax,
                      profit: parsedValue,
                      taxRate,
                    });
                    setRoundedValue('totalContractAmtBeforeTax', amountBeforeTax);
                    setRoundedValue('costPrice', costPrice);
                    setRoundedValue('profitRate', profitRate * 100, 2);
                    break;
                  }
                  case 'costPrice': {
                    const totalContractAmtAfterTax = getValues('totalContractAmtAfterTax');
                    const {
                      amountBeforeTax,
                      profitRate,
                      profit,
                    } = calculateAmount({
                      amountAfterTax: totalContractAmtAfterTax,
                      costPrice: parsedValue,
                      taxRate,
                    });

                    setRoundedValue('totalContractAmtBeforeTax', amountBeforeTax || 0);
                    setRoundedValue('totalProfit', profit || 0);
                    setRoundedValue('profitRate', profitRate * 100, 2);
                  }
                }

              }}
              error={!!error}
              disabled={disabled}
              placeholder={placeholder}
              helperText={error?.message}
            />
          </Box>
        );
      }}
    />
  );
};
