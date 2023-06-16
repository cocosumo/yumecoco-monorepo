import { RowLayout, RowLayoutProps } from './RowLayout';
import { useState } from 'react';
import { DetailsDialog } from './details/DetailsDialog';

export const ResultRow = (props: RowLayoutProps) => {

  const {
    uuid: projId,
    projName,
  } = props;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>


      <RowLayout {...props} onClick={handleOpen} />
   
    
      <DetailsDialog 
        open={open} 
        handleClose={handleClose}
        projId={typeof projId === 'string' ? projId : ''}
        projName={typeof projName === 'string' ? projName : ''}
      />
    </>

  );
};