import { FormGroup, FormLabel, Stack } from '@mui/material';
import { NumberField } from '../../../fields/NumberField';

export const TotalContractAmtIncTax = () => {


  return (
    <FormGroup>
      <FormLabel 
        sx={{
          mb: 1,
        }}
      >
        契約金額（税込）
      </FormLabel>
      <Stack
        direction={'row'}
        spacing={2}
      >

        <NumberField 
          name="totalContractAmtIncTaxFrom"
          suffix='から'
        />
        <NumberField 
          name="totalContractAmtIncTaxTo"
          suffix='まで'
        />

      </Stack>

    </FormGroup>
    
  );
}; 