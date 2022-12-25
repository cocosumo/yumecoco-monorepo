
import { InputAdornment } from '@mui/material';
import { FormikNumberField } from 'kokoas-client/src/components';
import {  ReactNode } from 'react';

import { KeyOfForm, TKMaterials } from '../../form';
import { useCalculateRow } from '../../hooks/useCalculateRow';

export const QuantityField = ({
  rowIdx,
  itemsFieldName = 'items',
  isDisabled = false,
  unitMenuButton,
}: {
  rowIdx: number
  itemsFieldName?: KeyOfForm,
  isDisabled?: boolean,
  unitMenuButton: ReactNode
}) => {

  const { handleChange } = useCalculateRow({
    watchField: 'quantity',
    rowIdx,
  });

  const rowName = `${itemsFieldName}[${rowIdx}]`;

  const fieldName: TKMaterials = 'quantity';
  const name = `${rowName}.${fieldName}`;


  return (
    <FormikNumberField
      name={name}
      size={'small'}
      disabled={isDisabled}
      onChange={handleChange}
      onFocus={({ target }) => target.select()}
      InputProps={{
        endAdornment:  (
          <InputAdornment position="end">
            {unitMenuButton}
          </InputAdornment>),
      }}
    />
  );
};