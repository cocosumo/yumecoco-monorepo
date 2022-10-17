import { DialogActions } from '@mui/material';
import { MenuContainer } from './PreviewMenu/MenuContainer';
import { SelectDocuments } from './SelectDocuments';

export const PreviewFooter = () => {
  return (
    <DialogActions
      sx={{
        justifyContent: 'flex-end',
      }}
    >
      <SelectDocuments />
      <MenuContainer />
    </DialogActions>
  );
};