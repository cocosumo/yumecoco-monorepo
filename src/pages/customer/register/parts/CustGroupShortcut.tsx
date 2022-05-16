

import { softDeleteById } from '../api/softDeleteById';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../../Router';
import { useSnackBar, useConfirmDialog } from '../../../../hooks';
import { Shortcuts } from '../../../../components/ui/speedDials/Shortcuts';

export  const  CustGroupShortcut = (props : {
  custGroupId: string

}) => {
  const { setDialogState } = useConfirmDialog();
  const { setSnackState } = useSnackBar();
  const navigate = useNavigate();
  const { custGroupId } = props;

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

    <Shortcuts
      shortcuts={[
        {
          type: 'project',
          handleClick: ()=>navigate(`${pages.projReg}?custGroupId=${custGroupId}`),
        },
        {
          type: 'delete',
          handleClick: ()=>setDialogState({ title: '確認', content: '削除しますか。', handleYes:  handleDelete }),
        },
      ]}
    />
  );
};
