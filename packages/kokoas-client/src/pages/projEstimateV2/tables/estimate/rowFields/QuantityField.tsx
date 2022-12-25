import { IconButton, InputAdornment } from '@mui/material';
import { NumberField } from 'kokoas-client/src/components/reactHookForm';
import { MouseEvent, useCallback, useState } from 'react';
import { Control, Controller, useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../../form';
import { getItemsFieldName } from '../EstTRow';
import { UnitTypeMenu } from './UnitTypeMenu';

export const QuantityField = ({
  rowIdx,
  control,
}: {
  rowIdx: number,
  control: Control<TypeOfForm>
}) => {
  const [unitMenuAnchorEl, setUnitMenuAnchorEl] = useState<null | HTMLButtonElement>(null);

  const unit = useWatch({
    name: getItemsFieldName(rowIdx, 'unit'),
    control,
  });

  const handleOpenUnitMenu = useCallback(({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    setUnitMenuAnchorEl(currentTarget);
  }, []);

  return (
    <>
      <NumberField
        controllerProps={{
          name: getItemsFieldName(rowIdx, 'quantity'),
          control,
        }}
        textFieldProps={{ 
          size: 'small', 
          InputProps: {
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  size='small'
                  onClick={handleOpenUnitMenu}
                  sx={{ fontSize: '12px' }}
                >
                  {unit}
                </IconButton>
                  
              </InputAdornment>
            ), 
          },
        }}
      />
      <Controller 
        name={getItemsFieldName(rowIdx, 'unit')}
        control={control}
        render={({
          field: {
            onChange,
          },
        }) => {

          return (
            <UnitTypeMenu
              open={!!unitMenuAnchorEl}
              anchorEl={unitMenuAnchorEl}
              handleClose={() => setUnitMenuAnchorEl(null)}
              handleChange={(e) => {
                const { value } = e.currentTarget.dataset;
                onChange(value);
                setUnitMenuAnchorEl(null);
              }}
            />
          );
        }}
      />
      
    </>
    
  );
};