import { Controller } from 'react-hook-form';
import { Chip, Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { useStores } from '../../hooks/useStores';
import { Box } from '@mui/system';
import { formatStores } from '../../helpers/formatStores';

export const SelectStores = () => {
  const { control } = useTypedFormContext();

  const { data: stores } = useStores();


  return (
    <Controller
      name='storeId'
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
              onChange={(e) => onChange(([] as string[]).concat(e.target.value).sort())}
              multiple
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((s) => (
                    <Chip size='small' key={s} label={formatStores(s, stores)} />
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
              <Divider />
              <MenuItem value={'自社物件'}>
                自社物件
              </MenuItem>

            </Select>
          </FormControl >
        );
      }}
    />
  );
};