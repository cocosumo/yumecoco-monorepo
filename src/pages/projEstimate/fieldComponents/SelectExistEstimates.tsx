import { Button } from '@mui/material';
import {  useState } from 'react';
import { ConfirmationDialogRaw } from './dialogActions/ConfirmationDialogRaw';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useEstimateRecords } from '../../../hooks';



export const SelectExistEstimates = ({ projId }:{ projId:string }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Dione');
  
  const { projEstimateRecords } = useEstimateRecords(projId);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (newValue: string) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };



  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        <ManageSearchIcon />
        見積もりの選択
      </Button>

      <ConfirmationDialogRaw
        id="ringtone-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
      />
    </>
  );
};