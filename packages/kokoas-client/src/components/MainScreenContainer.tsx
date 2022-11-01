import { ReactNode } from 'react';
import { GlobalBackdrop } from './ui/backdrop/GlobalBackdrop';
import { GlobalConfirmDialog } from './ui/dialogs/GlobalConfirmDialog';
import { GlobalSnackBar } from './ui/snacks/GlobalSnackBar';

export const MainScreenContainer = ({ children }: { children: ReactNode }) => {
  return (
    <GlobalBackdrop>
      <GlobalSnackBar>
        <GlobalConfirmDialog>
          {children}
        </GlobalConfirmDialog>
      </GlobalSnackBar>
    </GlobalBackdrop>
  );
};