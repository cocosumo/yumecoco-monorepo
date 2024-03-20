import { Controller } from 'react-hook-form';
import { KFormCustomer } from '../../../schema';
import { useTypedFormContext } from '../../../hooks/useTypedHooks';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { relations } from 'types';

export const ContactRelation = ({
  index,
  name,
  required,
} : {
  index: number,
  name: KFormCustomer,
  required?: boolean,
}) => {
  const { control } = useTypedFormContext();
  return (
    <Controller
      name={`customers.${index}.${name}`}
      control={control}
      render={({
        field: {
          onChange,
          value,
          ...otherFields
        },
        fieldState: { 
          error, 
          isTouched,
        },
        formState: {
          isSubmitted,
        },
      }) => {

        const showError = !!error && (isTouched || isSubmitted);

        return (
          <FormControl
            size='small'
            sx={{
              width: 200,
            }}
            required={required}
            error={showError}
          >
            <InputLabel>
              続柄
            </InputLabel>
            <Select
              value={value as string || ''}
              onChange={(e) => {
                onChange(e.target.value);
              }}
              label='続柄'
              size='small'
              {...otherFields}
            >
              {/* Empty */}
              <MenuItem value={''}>
                <em>
                  未選択
                </em>
              </MenuItem>
              {
                relations.map((relation) => {
                  return (
                    <MenuItem
                      key={relation}
                      value={relation}
                    >
                      {relation}
                    </MenuItem>
                  );
                })
              }
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