import { 
  Dialog, 
  DialogTitle, 
  Tab, 
  Tabs, 
} from '@mui/material';
import { DetailsContent } from './DetailsContent';
import { SyntheticEvent, useState } from 'react';
import { DialogCloseButton } from 'kokoas-client/src/components';

export const DetailsDialog = ({
  open,
  projId,
  projName,
  handleClose,
}: {
  open: boolean
  projId: string
  projName: string
  handleClose: () => void
}) => {
  const [tabIdx, setTabIdx] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setTabIdx(newValue);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={'lg'}
      fullWidth
      PaperProps={{
        sx: {
          height: '90vh',
        },
      }}
    >
      <DialogTitle
        sx={{
          pb: 0,
          display: 'relative',
        }}
      > 
        {projName}
        <Tabs value={tabIdx} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="顧客" />
          <Tab label="工事" />
          <Tab label="見積"  />
          <Tab label="契約"  />
        </Tabs>
        <DialogCloseButton handleClose={handleClose} />
      </DialogTitle>

      <DetailsContent 
        projId={projId}
        tabIdx={tabIdx}
        
      />
    </Dialog>
  );
};