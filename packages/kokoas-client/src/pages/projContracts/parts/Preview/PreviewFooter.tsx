import { DialogActions } from '@mui/material';
import { ReactNode } from 'react';
import { MenuContainer } from './PreviewMenu/MenuContainer';
export const PreviewFooter = ({ children }: { children: ReactNode }) => {
  return (
    <DialogActions
      sx={{
        justifyContent: 'flex-end',
      }}
    >
      {children}

      <MenuContainer />
    </DialogActions>
  );
};