import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../../hooks/useTypedRHF';
import { FormControl, FormHelperText, InputLabel, LinearProgress, MenuItem, Select, Stack } from '@mui/material';
import { useBillingItems } from '../../../hooks/useBillingItems';



export const InvoiceItem = ({
  index,
  required,
}: {
  index: number,
  required?: boolean
}) => {

  const { control, setValue } = useTypedFormContext();

  const {
    billingItems,
    isFetching,
  } = useBillingItems();


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

              {isFetching && (<LinearProgress />)}
              {!isFetching && <Select
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
                        disabled={billingItem.disabled}
                      >
                        {itemLabel}
                      </MenuItem>
                    );
                  })
                }

                <MenuItem
                  key={'その他'}
                  value={'other'}
                >
                  その他
                </MenuItem>
              </Select>}
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
