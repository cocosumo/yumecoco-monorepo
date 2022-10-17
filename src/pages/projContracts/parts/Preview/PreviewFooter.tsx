import { DialogActions } from '@mui/material';
import { MenuContainer } from './PreviewMenu/MenuContainer';

export const PreviewFooter = () => {
  return (
    <DialogActions
      sx={{
        justifyContent: 'space-between',
      }}
    >
      <MenuContainer />
    </DialogActions>
  );
};