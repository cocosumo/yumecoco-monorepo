import { Controller } from 'react-hook-form';
import { useStores } from '../../hooks/useStores';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { Box, Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

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
              onChange={(e) => onChange(([] as string[]).concat( e.target.value))}
              multiple
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((s) => (
                    <Chip size='small' key={s} label={stores?.find(({ uuid }) => uuid.value === s )?.storeNameShort.value} />
                  ))}
                </Box>
              )}
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