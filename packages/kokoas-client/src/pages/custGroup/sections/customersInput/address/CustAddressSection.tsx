import { Controller } from 'react-hook-form';
import { ControlledTextField } from '../../../fields/ControlledTextField';
import { CustomerSectionContainer } from '../CustomerSectionContainer';
import { Postal } from './postal/Postal';
import { useTypedFormContext } from '../../../hooks/useTypedHooks';
import { Checkbox, FormControlLabel, Stack } from '@mui/material';

export const CustomerAddressSection = ({
  index,
}:{ 
  index: number 
}) => {

  const { control } = useTypedFormContext();

  const isFirstCust = index === 0;
  
  return (
    <Controller 
      control={control}
      name={`customers.${index}.isSameAddress`}
      render={({
        field: {
          value: isSameAsRepresentative,
          onChange,
          ...restFields
        },
      }) => {

        return (
          <Stack spacing={2}>

            {!isFirstCust &&  (
              <FormControlLabel 
                label="住所は代表者と同じ"
                control={(
                  <Checkbox 
                    checked={isSameAsRepresentative}
                    onChange={(_, checked) => {
                      onChange(checked);
                    }}
                    {...restFields}
                  />)}
              />
            ) }
 

            {(isFirstCust || !isSameAsRepresentative) && (
            <CustomerSectionContainer>
              <Postal index={index} />
              <ControlledTextField 
                name={`customers.${index}.${'address1'}`}
                label='住所（県市区町村）'
                placeholder='愛知県豊川市千歳通'
              />
              <ControlledTextField 
                name={`customers.${index}.${'address2'}`}
                label='住所（番地以降）'
                placeholder='２番地１９マンション２３号'
              />
            </CustomerSectionContainer>
            )}

          
          </Stack>
        );
      }}
    />
  );
};  