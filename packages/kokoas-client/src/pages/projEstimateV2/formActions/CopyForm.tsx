import { Button, Checkbox, FormControlLabel, Stack, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useBackdrop, useConfirmDialog, useSnackBar } from '../../../../hooks';

import {  KeyOfForm } from '../../form';
import { ComponentProps, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../../Router';
import { generateParams } from 'kokoas-client/src/helpers/url';



const CopyDialogContent = ({
  handleChangeIsSameProj,
}: {
  handleChangeIsSameProj: (checked: boolean) => void
}) => {

  const [checked, setChecked] = useState(false);

  const handleChange: ComponentProps<typeof Checkbox>['onChange'] = (event) => {
    setChecked(event.target.checked);
    handleChangeIsSameProj(event.target.checked);
  };

  return (
    <Stack spacing={2}>
      <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} />} label="同じ工事" />
    </Stack>
  );
};

export const CopyForm = () => {

  const { setSnackState } = useSnackBar();
  const { setDialogState, handleClose } = useConfirmDialog();
  const { setBackdropState } = useBackdrop();
  const navigate = useNavigate();
  const isSameProj = useRef(false);


  const handleCopy = async () => {
    try {
      handleClose();
      setBackdropState({ open: true });

      const dummyProcessTime = 2000;

      setTimeout(() => {

        setBackdropState({ open: false });
        setSnackState({
          open: true,
          autoHideDuration: dummyProcessTime,
          message: 'コピーしました。',
          severity: 'success',
          handleClose: () => {
            setBackdropState({ open: false });
          },
        });

        /**
         * if same project, use the current state but clear estimate id,
         * otherwise, use initialValue and only copy items.
         */
        const fieldToClear : KeyOfForm = 'estimateId'; 

        navigate(`${pages.projEstimate}?${generateParams({
          clearFields: isSameProj.current ? fieldToClear : '0',
        })}`);

      }, dummyProcessTime);


    } catch (err: any) {
      setSnackState({
        open: true,
        message: err.message,
        severity: 'error',
      });
    }

  };




  const handleClickCopy = () => {
    setDialogState({
      open: true,
      title: '見積もりのコピーを作成',
      content: (
        <CopyDialogContent
          handleChangeIsSameProj={(checked)=>{
            isSameProj.current = checked;
          }}
        />),
      handleYes: handleCopy,
      cancellable: true,
    });
  };



  return (
    <Tooltip title={'当レコードをコピーし、新なレコードを作成します'}>
      <Button
        variant="outlined"
        size="large"
        onClick={handleClickCopy}
      >
        <ContentCopyIcon />
      </Button>
    </Tooltip>
  );
};