import { MenuItem } from '@mui/material';
import { contractTypes } from '../../schema';


export const ContractTypeFieldChoices = () => {

  return (
    <>
      {contractTypes
        .map(choice => (
          <MenuItem
            key={choice}
            value={choice}
          >
            {choice}
          </MenuItem>
        ))}
    </>
  );
};

