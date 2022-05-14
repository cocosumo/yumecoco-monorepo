

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DeleteIcon from '@mui/icons-material/Delete';
import CarpenterIcon from '@mui/icons-material/Carpenter';
import { useState } from 'react';
import { ConfirmDialog } from '../../../../components/ui/dialogs/ConfirmDialog';
import { softDeleteById } from '../api/softDeleteById';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../../Router';
import { useSnackBar } from '../../../../hooks';



export  function ShortCuts(props : {
  custGroupId: string
 
}) {

  const { setSnackState } = useSnackBar();
  const navigate = useNavigate();
  const { custGroupId } = props;
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleDelete = () => {
    softDeleteById(custGroupId).then((resp)=>{
      if (resp.revision){
        setSnackState({
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
          icon={<CarpenterIcon />}
          tooltipTitle={'工事を登録する'}
          tooltipOpen
          onClick={()=>navigate(`${pages.projReg}?custGroupId=${custGroupId}`)}
        />

        <SpeedDialAction
          icon={<DeleteIcon />}
          tooltipTitle={'削除'}
          tooltipOpen
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
