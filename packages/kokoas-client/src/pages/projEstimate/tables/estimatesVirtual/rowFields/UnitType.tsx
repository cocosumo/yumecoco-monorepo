import { IconButton, InputAdornment } from '@mui/material';
import { MouseEvent, useCallback, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../../../form';
import { UnitTypeMenu } from './UnitTypeMenu';


export const UnitType = ({
  rowIdx,
} : {
  rowIdx: number
}) => {
  const {
    control,
  } = useFormContext<TypeOfForm>();
  const [unitMenuAnchorEl, setUnitMenuAnchorEl] = useState<null | HTMLButtonElement>(null);

  const handleOpenUnitMenu = useCallback(({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    setUnitMenuAnchorEl(currentTarget);
  }, []);

  return (

    <Controller
      name={getItemsFieldName(rowIdx, 'unit')}
      control={control}
      render={({
        field: {
          onChange,
          value: unit,
        },
      }) => {

        return (
          <>
            <InputAdornment position='end'>
              <IconButton
                size='small'
                onClick={handleOpenUnitMenu}
                sx={{ fontSize: '12px' }}
              >
                {unit}
              </IconButton>
            </InputAdornment>
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
          </>
         
        );
      }}
    />
  );

};