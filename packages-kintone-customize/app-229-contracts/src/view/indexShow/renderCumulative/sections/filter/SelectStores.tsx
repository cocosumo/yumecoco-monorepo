import { Controller } from 'react-hook-form';
import { useStores } from '../../hooks/useStores';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const SelectStores = () => {
  const { control } = useTypedFormContext();
  
  const { data: stores } = useStores();
  
  
  return (
    <Controller 
      name='stores'
      control={control}
      render={({
        field: { onChange, value, ...otherField },
      }) => {

        return (
          <FormControl 
            size='small'
            sx={{
              minWidth: '150px',
            }}
          >
            <InputLabel id="selectStoresLabel">
              店舗
            </InputLabel>
            <Select
              labelId="selectStores"
              id="selectStores"
              value={value}
              label="店舗"
              onChange={(e) => onChange(e.target.value)}
              {...otherField}
            >
              {stores?.map(({
                uuid,
                storeNameShort,
              }) => (
                <MenuItem 
                  key={uuid.value}
                  value={uuid.value}
                >
                  {storeNameShort.value}
                </MenuItem>
              ))}
                  
                
            </Select>
          </FormControl>
        );
      }}
    />
  );
};