import { Dialog } from '@mui/material';

import { ConfirmDelete } from './ConfirmDelete';
import { useLinkedContracts } from '../../../hooks/useLinkedContracts';
import { LinkedContracts } from './LinkedContracts';

export const ConfirmationDialog = ({
  open,
  handleClose,
}:{
  open: boolean,
  handleClose: () => void,
}) => {

  const { data = [] } = useLinkedContracts();

  const hasContracts = !!data.length;
  
  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      {
        hasContracts && (
          <LinkedContracts 
            handleClose={handleClose}
          />
        )
          
      }
      {!hasContracts && (
      <ConfirmDelete
        handleClose={handleClose}
      />
      )}
    </Dialog>
  );
};