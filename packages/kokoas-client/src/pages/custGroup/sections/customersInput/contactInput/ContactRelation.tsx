import { Controller } from 'react-hook-form';
import { KFormCustomer } from '../../../schema';
import { useTypedFormContext } from '../../../hooks/useTypedHooks';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { relations } from 'types';

export const ContactRelation = ({
  index,
  name,
} : {
  index: number,
  name: KFormCustomer,
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
        },
      }) => {
        return (
          <FormControl
            size='small'
            sx={{
              width: 200,
            }}
          >
            <InputLabel>
              続柄
            </InputLabel>
            <Select
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
              }}
              label='続柄'
              size='small'
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
          </FormControl>
        );
      }}
    />
  );
};