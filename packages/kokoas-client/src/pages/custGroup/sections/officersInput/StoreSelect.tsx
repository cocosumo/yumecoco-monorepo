import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
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
        id: uuid.value,
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
      render={({
        field: {
          onChange,
          value,
          ...restFields
        },
        fieldState: {
          isTouched,
          error,
          isDirty,
        },
      }) => {
        const showError = !!error && (isTouched || isDirty);


        return (
          <FormControl
            size='small' 
            fullWidth
            sx={{
              maxWidth: 300,
            }}
            error={showError}
            required
          >
            <InputLabel >
              店舗
            </InputLabel>
            <Select
              value={value}
              label="店舗"
              onChange={(e) => {
                onChange(e.target.value as string);
              }}
              {...restFields}
            >
              <MenuItem value="">
                <em>
                  --- 未選択 ---
                </em>
              </MenuItem>
              {data?.map(({ label, id }) => (
                <MenuItem key={id} value={id}>
                  {label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {showError && error.message}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};