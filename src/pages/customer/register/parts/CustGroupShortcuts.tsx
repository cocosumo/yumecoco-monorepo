

import { softDeleteById } from '../api/softDeleteById';
import { useNavigate } from 'react-router-dom';
import { useQuery, useSnackBar, useConfirmDialog } from '../../../../hooks';
import { pages } from '../../../Router';

import { Shortcuts, ShortCutType } from '../../../../components/ui/speedDials/Shortcuts';


export  const  CustGroupShortcuts = (props : {
  custGroupId: string

}) => {
  const { setDialogState } = useConfirmDialog();
  const { setSnackState } = useSnackBar();
  const navigate = useNavigate();

  let passedProjId = useQuery().get('projId');
  const { custGroupId } = props;

  const handleDelete = () => {
    softDeleteById(custGroupId).then((resp)=>{
      if (resp.revision) {
        setSnackState({
          open: true,
          message: '削除しました。',
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

        ...(passedProjId ? [{
          type: 'project' as ShortCutType,
          handleClick: ()=>navigate(`${pages.projEdit}?projId=${passedProjId}`),
        }] : []),

        {
          type: 'delete',
          handleClick: ()=>setDialogState({ title: '確認', content: '削除しますか。', handleYes:  handleDelete }),
        },

      ]}
    />
  );
};
