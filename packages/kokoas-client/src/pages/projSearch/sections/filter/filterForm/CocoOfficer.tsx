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

export const CocoOfficer = ({
  includeRetired,
}: {
  includeRetired: boolean
}) => {
  const {
    control,
    setValue,
    getValues,
  } = useFormContext<TypeOfForm>();
  const { data } = useCocoEmpGrpByArea(includeRetired);
  console.log('data', data);

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
    const labels = menuItems.map(({ label }) => label);
    const currentVal = getValues('cocoAG') ?? [];
    setValue('cocoAG', intersection(currentVal, labels ));
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
          sx={{ maxWidth: 259 }}
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
              onChange(e.target.value);
            }}
            
          >
            <MenuItem onClick={() => onChange(null)}>
              <Typography variant="caption" >
                クリア
              </Typography>
              
            </MenuItem>

            {menuItems.map(({
              label,
              value: itemValue,
              isRetired,
            }) => {
              return (
                <MenuItem key={itemValue} value={label}>
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