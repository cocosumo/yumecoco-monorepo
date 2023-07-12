import { MenuItem, Select, SelectProps } from '@mui/material';
import { contractTypes } from '../../schema';

export const ContractTypeFieldChoices = (props: SelectProps) => {

  return (
    <Select
      {...props}
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
};