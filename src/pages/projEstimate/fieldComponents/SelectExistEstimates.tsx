import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { ConfirmationDialogRaw } from './dialogActions/ConfirmationDialogRaw';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useEstimateRecords } from '../../../hooks';
import { useFormikContext } from 'formik';
import { getFieldName, TypeOfForm } from '../form';



export const SelectExistEstimates = ({
  projId,
}: {
  projId: string,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const { setFieldValue } = useFormikContext<TypeOfForm>();

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

  useEffect(()=>{
    setFieldValue(getFieldName('estimateId'), value);
  }, [value]);



  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        <ManageSearchIcon />
        見積もりの選択
      </Button>

      <ConfirmationDialogRaw
        name='estimateId'
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
        options={projEstimateRecords}
      />
    </>
  );
};