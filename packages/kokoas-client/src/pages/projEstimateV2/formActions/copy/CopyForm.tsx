import { Button, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { KeyOfForm } from '../../form';
import { pages } from '../../../Router';
import { useBackdrop, useConfirmDialog, useSnackBar } from 'kokoas-client/src/hooks';
import { CopyDialogContent } from './CopyDialogContent';





export const CopyForm = () => {

  const { setSnackState } = useSnackBar();
  const { setDialogState, handleClose } = useConfirmDialog();
  const { setBackdropState } = useBackdrop();
  const navigate = useNavigate();
  const isSameProj = useRef(false);


  const handleCopy = async () => {
    try {
      handleClose();
      setSnackState({
        open: true,
        autoHideDuration: 2000,
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
          defaultChecked={isSameProj.current}
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