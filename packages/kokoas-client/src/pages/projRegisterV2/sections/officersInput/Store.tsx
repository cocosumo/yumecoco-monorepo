import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks';
import { useStores } from 'kokoas-client/src/hooksQuery';
import { Chip, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

export const Store = () => {

  const { control, setValue, watch } = useTypedFormContext();
  const { data } = useStores((d) => {
    return d
      ?.map(({
        uuid,
        店舗名: storeName,
        sortNumber,
        territory,
        storeCode,
      }) => ({
        label: storeName.value,
        id: uuid.value,
        sortNumber: sortNumber.value,
        territory: territory.value,
        storeCode: storeCode.value,
      }))
      .sort((a, b) => {
        return +b.sortNumber - +a.sortNumber;
      });
  } );
 
  return (
    <Controller
      name="storeId"
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
                const newStoreId = e.target.value as string;
                const selectedStore = data?.find(({ id }) => id === newStoreId);
                onChange(newStoreId);

                const {
                  storeCode = '',
                  territory = '',
                  label: newStoreName = '',
                } = selectedStore || {};

                if (selectedStore) {
                  setValue('storeCode', storeCode);
                  setValue('territory', territory);
                  setValue('storeName', newStoreName);

                }
              }}
              {...restFields}
            >
              <MenuItem value="">
                <em>
                  --- 未選択 ---
                </em>
              </MenuItem>
              {data?.map(({ label, id, territory }) => (
                <MenuItem key={id} value={id}>
                  <Chip
                    label={territory}
                    sx={{
                      mr: 1,
                    }}
                    size='small'
                  />
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