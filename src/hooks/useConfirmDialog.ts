
import { useContext } from 'react';
import { ConfirmDialogContext } from '../components/ui/dialogs/GlobalConfirmDialog';


export const useConfirmDialog = () => {
  const confirmDialogContext = useContext(ConfirmDialogContext);

  if (!confirmDialogContext) {
    throw new Error(
      'No confirmDialogContext found when calling ConfirmDialogContext.',
    );
  }
  return confirmDialogContext;
};