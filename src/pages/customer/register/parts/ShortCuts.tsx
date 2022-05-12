

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { ConfirmDialog } from '../../../../components/ui/dialogs/ConfirmDialog';
import { softDeleteById } from '../api/softDeleteById';
import { SnackState } from '../../../../components/ui/snacks/FormSnack';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../../Router';

export  function ShortCuts(props : {
  custGroupId: string
  handleSnack: (snackState: SnackState) => void
}) {

  const navigate = useNavigate();
  const { custGroupId, handleSnack } = props;
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleDelete = () => {
    softDeleteById(custGroupId).then((resp)=>{
      if (resp.revision){
        handleSnack({
          open: true,
          message: '削除できました。',
          severity: 'warning',
          handleClose: ()=>{
            navigate(pages.custGroupReg);
          },
        });
      }
    });
  };

  return (
    <>

      <SpeedDial
      ariaLabel="Menu"
      sx={{ position: 'fixed', bottom: 16, right: 36, zIndex: 3000 }}
      icon={<SpeedDialIcon />}
    >

        <SpeedDialAction
          icon={<DeleteIcon />}
          tooltipTitle={'削除'}
          onClick={handleConfirmOpen}
        />


      </SpeedDial>

      <ConfirmDialog
        open={confirmOpen}
        title={'確認'}
        content={'削除しますか。'}
        handleAnswer={(isYes)=>{
          if (isYes) handleDelete();
          setConfirmOpen(false);
        }}
        />
    </>
  );
}
