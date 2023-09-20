import { FormGroup, FormLabel, InputAdornment, OutlinedInput, Stack } from '@mui/material';
import { useTypedFormContext } from '../../hooks/useTypedHooks';
import { KForm } from '../../schema';
import { Controller } from 'react-hook-form';

const AmountField = ({
  fieldName,
  suffix,
}:{
  fieldName: KForm;
  suffix: string;
}) => {
  const { control } = useTypedFormContext();

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({
        field,
      }) => (
        <OutlinedInput
          fullWidth
          size="small"
          type='number'
          {...field}
          inputProps={{
            style: {
              textAlign: 'right',
            },
          }}
          endAdornment={(
            <InputAdornment position="end">
              {suffix}
            </InputAdornment>)}
        />
      )}
    />
  );
};


export const ContractAmt = () => {
  
  return (
    <FormGroup>
      <FormLabel>
        契約金額
      </FormLabel>
      <Stack 
        pt={1} 
        spacing={2} 
        direction={'row'}
      >
        <AmountField 
          fieldName='contractAmtFrom' 
          suffix='万円から'
        />
        <AmountField 
          fieldName='contractAmtTo' 
          suffix='万円まで'
        />
      </Stack>
    </FormGroup>
  );
};