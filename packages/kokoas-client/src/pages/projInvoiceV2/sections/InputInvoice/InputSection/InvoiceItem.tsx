import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../../hooks/useTypedRHF';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { BillingItems } from './InputSection';



export const InvoiceItem = ({
  index,
  required,
  billingItems,
}: {
  index: number,
  required?: boolean
  billingItems: BillingItems[]
}) => {

  const { control } = useTypedFormContext();

  return (

    <Controller
      name={`invoiceDetails.${index}.invoiceItem`}
      control={control}
      render={({
        field: {
          onChange,
          value,
          ...otherFields
        },
        fieldState: {
          error,
          isTouched,
        },
        formState: {
          isSubmitted,
        },
      }) => {
        const showError = !!error && (isTouched || isSubmitted);

        return (
          <Stack
            direction={'row'}
            spacing={2}
          >
            <FormControl
              size='small'
              sx={{
                width: 200,
              }}
              required={required}
              error={showError}
            >
              <InputLabel>
                項目
              </InputLabel>
              <Select
                value={value as string || ''}
                onChange={(e) => {
                  onChange(e.target.value);
                }}
                label='項目'
                size='small'
                {...otherFields}
              >
                {
                  billingItems.map((billingItem) => {
                    const itemLabel = `${billingItem.contractType}-${billingItem.label}`;
                    return (
                      <MenuItem
                        key={itemLabel}
                        value={itemLabel}
                      >
                        {itemLabel}
                      </MenuItem>
                    );
                  })
                }
              </Select>
              <FormHelperText>
                {showError && error.message}
              </FormHelperText>

            </FormControl>
          </Stack>
        );
      }}
    />
  );
};
