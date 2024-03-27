import { 
  Dialog, 
  DialogTitle, 
  Tab, 
  Tabs, 
} from '@mui/material';
import { DetailsContent } from './DetailsContent';
import { SyntheticEvent, useState } from 'react';
import { DialogCloseButton } from 'kokoas-client/src/components';
import { DetailsDialogTitle } from './DetailsDialogTitle';
import { isProd } from 'config';

const tabs = [
  '顧客',
  '工事',
  '見積',
  '契約',
  '発注',
  '入金',
  '原価管理表',
] as const;

export type DetailsTabs = typeof tabs[number];

const prodTabs = tabs.filter((tab) => tab !== '発注'); 

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
  const [tabValue, setTabValue] = useState<DetailsTabs>('顧客');

  const handleChange = (_: SyntheticEvent, newValue: DetailsTabs) => {
    setTabValue(newValue);
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
        <DetailsDialogTitle
          projId={projId}
          projName={projName}
        />
        <Tabs value={tabValue} onChange={handleChange}>
          {
            (isProd ? prodTabs : tabs)
              .map((tab) => (
                <Tab 
                  key={tab} 
                  label={tab}
                  value={tab}
                />
              ))
          }
        </Tabs>
        <DialogCloseButton handleClose={handleClose} />
      </DialogTitle>

      <DetailsContent 
        projId={projId}
        tabValue={tabValue}
        
      />
    </Dialog>
  );
};