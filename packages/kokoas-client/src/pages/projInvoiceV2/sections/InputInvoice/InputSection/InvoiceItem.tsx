import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../../hooks/useTypedRHF';
import { KTInvoiceDetail } from '../../../schema';
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { grey } from '@mui/material/colors';
import { BillingItems } from './InputSection';




export const InvoiceItem = ({
  index,
  name,
  required,
  billingItems,
}: {
  index: number,
  name: KTInvoiceDetail,
  required?: boolean
  billingItems: BillingItems[]
}) => {

  const { control } = useTypedFormContext();

  return (

    <Controller
      name={`invoiceDetails.${index}.${name}`}
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
          <Box
            bgcolor='white'
            p={2}
            border={1}
            borderColor={grey[300]}
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
          </Box>
        );
      }}
    />
  );
};
