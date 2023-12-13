import { Controller } from 'react-hook-form';
import { useTypedFormContext, useTypedWatch } from '../../hooks';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useInHouseProjTypes } from 'kokoas-client/src/hooksQuery';

export const InHouseProjType = () => {
  const {
    control,
    setValue,
  } = useTypedFormContext();

  const projTypeName = useTypedWatch({
    name: 'projTypeName',
    control,
  }) as string;

  const { data: inHouseProjTypes } = useInHouseProjTypes();

  if (!projTypeName.includes('自社物件')) {
    return null;
  }


  return (
    <Controller
      name='inHouseProjTypeId'
      control={control}
      render={({
        field: {
          onBlur,
          onChange,
          value: newValue,
        },
        fieldState: {
          error,
        },
        formState: {
          isSubmitted,
        },
      }) => {
        const showError = isSubmitted && !!error?.message;

        return (
          <FormControl
            size='small'
            sx={{
              width: 300,
            }}
            placeholder='自社工事区分'
            error={showError}
            //disabled={disabled}
            required
          >
            <InputLabel>
              自社工事区分
            </InputLabel>
            <Select
              value={newValue}
              label="自社工事区分"
              onBlur={onBlur}
              onChange={(e) => {
                const newInHouseProjTypeId = e.target.value;

                const {
                  label: inHouseProjTypeName,
                } = inHouseProjTypes?.find(({ uuid }) => uuid.value === newInHouseProjTypeId) || {};

                setValue('inHouseProjTypeName', inHouseProjTypeName?.value || '');

                onChange(newInHouseProjTypeId);
              }}
            >
              <MenuItem value="">
                ---
              </MenuItem>
              {inHouseProjTypes?.map(({
                label,
                uuid,
              }) => {
                return (
                  <MenuItem key={uuid.value} value={uuid.value}>
                    {label.value}
                  </MenuItem>
                );
              })}

            </Select>
            <FormHelperText>
              {error?.message}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};
