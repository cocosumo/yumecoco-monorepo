import { 
  FormControl, 
  InputLabel, 
  ListSubheader, 
  MenuItem, 
  Select,
  Typography, 
} from '@mui/material';
import { useYumeByStore } from '../../../hooks/useYumeByStore';
import { Controller, useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../../../schema';
import { Option } from '../../../types';
import { useEffect } from 'react';
import intersection from 'lodash/intersection';

const inputLabel = 'ゆめてつAG';


export const renderMenuItems = (options: Option[]) => {
  return options
    .map(({ isRetired, label, value: optVal }) => {
      return (
        <MenuItem key={optVal} value={optVal}>
          {label}
          {isRetired && (
          <Typography ml={2} sx={{ color: 'text.secondary' }}>
            退職者
          </Typography>
          )}
        </MenuItem>
      );
    });
};

export const YumeOfficer = () => {
  const {
    control,
    getValues,
    setValue,
  } = useFormContext<TypeOfForm>();
  const { data } = useYumeByStore();

  useEffect(() => {
    if (!data?.length) return;
    // remove values that are not in the select menu
    const values: string[] = data.flatMap(([_, { options }]) => options.map(option => option.value));
    const currentVal = getValues('yumeAG') ?? [];
    setValue('yumeAG', intersection(currentVal, values ));
  }, 
  [
    data,
    getValues,
    setValue,
  ]);

  return (
    <Controller 
      control={control}
      name='yumeAG'
      render={({
        field: {
          value,
          onChange,
          name,
        },
      }) => (
        <FormControl 
          fullWidth 
          size='small'
          sx={{ maxWidth: 259, maxHeight: 39 }}
        >
          <InputLabel id={name}>
            {inputLabel}
          </InputLabel>
          <Select
            labelId={name}
            label={inputLabel}
            value={value ?? []}
            multiple
            onChange={(e) => {
              onChange(e.target.value as string[]);
            }}
          >
            <MenuItem onClick={() => onChange(null)}>
              全員
            </MenuItem>
            {data && data.map(([store, content]) => {

              const {
                options,
              } = content;

              return (
                [
                  <ListSubheader key={store}>
                    {store} 
                  </ListSubheader>,
                  renderMenuItems(options),
                ]);
            })}
        
          </Select>
        </FormControl>
      )}
    
    />
    
  );
};
