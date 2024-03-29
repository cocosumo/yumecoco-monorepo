import { 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select,
  Typography, 
} from '@mui/material';
import { useCocoEmpGrpByArea } from '../../../hooks/useCocoEmpGrpByArea';
import { Controller, useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../../../schema';
import { useEffect, useMemo } from 'react';
import intersection from 'lodash/intersection';

const inputLabel = 'ここすも担当者';

export const CocoOfficer = () => {
  const {
    control,
    setValue,
    getValues,
  } = useFormContext<TypeOfForm>();

  const { data } = useCocoEmpGrpByArea();

  const menuItems = useMemo(() => {
    if (data) {
      const westItems = data['西'] ?? [];
      const eastItems = data['東'] ?? [];
      return [...westItems, ...eastItems];
    } else {
      return [];
    }
  }, [data]);

  useEffect(() => {
    if (!menuItems.length) return;
    // remove values that are not in the select menu
    const values = menuItems.map(({ value }) => value);
    const currentVal = getValues('cocoAG') ?? [];
    setValue('cocoAG', intersection(currentVal, values ));
  }, 
  [
    menuItems,
    getValues,
    setValue,
  ]);

  return (

    <Controller 
      name='cocoAG'
      control={control}
      render={({
        field: {
          value,
          onChange,
        },
      }) => (
        <FormControl 
          fullWidth 
          size='small'
          sx={{ maxWidth: 259,  maxHeight: 39 }}
        >
          <InputLabel id="cocoAg">
            {inputLabel}
          </InputLabel>


          <Select
            labelId="cocoAg"
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

            {menuItems.map(({
              label,
              value: itemValue,
              isRetired,
            }) => {
              return (
                <MenuItem key={itemValue} value={itemValue}>
                  {label}
                  {isRetired && (
                    <Typography 
                      ml={2} 
                      sx={{ color: 'text.secondary' }}
                      component={'span'}
                    >
                      退職者
                    </Typography>
                  )}
                </MenuItem>
              );
            })}
        
          </Select>
        </FormControl>
      )}
    />
    
  );
};
