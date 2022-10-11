import { DialogActions } from '@mui/material';
import { ContractStatus } from './ContractStatus';
import { MenuContainer } from './PreviewMenu/MenuContainer';

export const PreviewFooter = () => {
  return (
    <DialogActions
      sx={{
        justifyContent: 'space-between',
      }}
    >
      <ContractStatus />
      <MenuContainer />
    </DialogActions>
  );
};