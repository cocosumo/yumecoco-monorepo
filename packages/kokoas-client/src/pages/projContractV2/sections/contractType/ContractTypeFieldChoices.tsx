import { MenuItem, Select, SelectProps } from '@mui/material';
import { contractTypes } from '../../schema';
import { forwardRef } from 'react';

export const ContractTypeFieldChoices = forwardRef<HTMLSelectElement, SelectProps>((
  props: SelectProps,
  ref,
) => {

  return (
    <Select
      {...props}
      ref={ref}
    >
      {contractTypes
        .map(choice => (
          <MenuItem
            key={choice}
            value={choice}
          >
            {choice}
          </MenuItem>
        ))}
    </Select>
  );
});

ContractTypeFieldChoices.displayName = 'ContractTypeFieldChoices';