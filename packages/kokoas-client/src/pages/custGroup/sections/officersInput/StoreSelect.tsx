import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks/useTypedHooks';
import { useStores } from 'kokoas-client/src/hooksQuery';

export const StoreSelect = () => {
  const { control } = useTypedFormContext();
  const { data } = useStores((d) => {
    return d
      ?.map(({
        uuid,
        店舗名: storeName,
        sortNumber,
      }) => ({
        label: storeName.value,
        value: uuid.value,
        sortNumber: sortNumber.value,
      }))
      .sort((a, b) => {
        return +b.sortNumber - +a.sortNumber;
      });
  } );
 
  return (
    <Controller
      name="store"
      control={control}
      render={() => {
        return (
          <FormControl
            size='small' 
            fullWidth
            sx={{
              maxWidth: 300,
            }}
          >
            <InputLabel >
              店舗
            </InputLabel>
            <Select
              //value={age}
              label="店舗"
              //onChange={handleChange}
            >
              <MenuItem value="">
                <em>
                  --- 未選択 ---
                </em>
              </MenuItem>
              {data?.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }}
    />
  );
};