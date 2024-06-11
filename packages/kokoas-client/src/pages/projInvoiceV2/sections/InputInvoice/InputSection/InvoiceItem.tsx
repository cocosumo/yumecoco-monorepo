import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../../hooks/useTypedRHF';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack } from '@mui/material';



export type BillingItems = {
  contractType: string;
  label: string;
  amount: number;
};

const billingItems: BillingItems[] = [{
  contractType: '契約',
  label: '着工金',
  amount: 600000,
},
{
  contractType: '契約',
  label: '最終金',
  amount: 400000,
},
{
  contractType: '追加',
  label: 'その他',
  amount: -500000,
}];

export const InvoiceItem = ({
  index,
  required,
}: {
  index: number,
  required?: boolean
}) => {

  const { control, setValue } = useTypedFormContext();

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

                  const newItemLabel = e.target.value;
                  const newBillingAmt = billingItems.find(({ contractType, label }) =>
                    (`${contractType}-${label}`) === newItemLabel)?.amount || 0;

                  setValue(`invoiceDetails.${index}.billingAmount`, newBillingAmt);

                  onChange(newItemLabel);

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
          </Stack >
        );
      }}
    />
  );
};
