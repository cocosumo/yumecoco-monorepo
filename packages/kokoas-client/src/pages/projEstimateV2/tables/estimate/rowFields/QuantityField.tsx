import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { MouseEvent, useCallback, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../../../form';
import { UnitTypeMenu } from './UnitTypeMenu';

export const QuantityField = ({
  rowIdx,
}: {
  rowIdx: number,
}) => {
  const {
    control,
    register,
    getValues,
  } = useFormContext<TypeOfForm>();
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
      <OutlinedInput
        {...register(getItemsFieldName(rowIdx, 'quantity'), {
          onChange: (e) => {
            const newValue = +(e.target as HTMLInputElement).value ;
            const testValue = getValues(getItemsFieldName(rowIdx, 'quantity'));
            console.log(newValue, testValue);
          },
        })}
        size='small'
        type={'number'}
        style={{ textAlign: 'right' }}
        endAdornment={(
          <InputAdornment position='end'>
            <IconButton
              size='small'
              onClick={handleOpenUnitMenu}
              sx={{ fontSize: '12px' }}
            >
              {unit}
            </IconButton>
          </InputAdornment>
          )}
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