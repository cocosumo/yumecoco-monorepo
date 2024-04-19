import { DialogTitle } from '@mui/material';

import { OrderDataId } from './OrderDataId';
import { StoreName } from './StoreName';
import { ProjectName } from './ProjectName';

export const OrderDialogTitle = () => {

  return (
    <DialogTitle
      sx={{
        display: 'flex', 
        direction: 'row',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <StoreName />
      <ProjectName />
      <OrderDataId />
    </DialogTitle>
  );
};