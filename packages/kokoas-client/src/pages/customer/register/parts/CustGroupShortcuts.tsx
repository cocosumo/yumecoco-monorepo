

import { useNavigate } from 'react-router-dom';
import { useQuery, useSnackBar, useConfirmDialog } from '../../../../hooks';
import { pages } from '../../../Router';

import { Shortcuts, ShortCutType } from '../../../../components/ui/speedDials/Shortcuts';
import { softDelCustGroupById } from 'api-kintone/src/custgroups/softDelCustGroupById';


export  const  CustGroupShortcuts = (props : {
  custGroupId: string

}) => {
  const { setDialogState } = useConfirmDialog();
  const { setSnackState } = useSnackBar();
  const navigate = useNavigate();

  const passedProjId = useQuery().get('projId');
  const { custGroupId } = props;

  const handleDelete = () => {
    softDelCustGroupById(custGroupId).then((resp)=>{
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

        ...(passedProjId ? [

          {
            type: 'contract' as ShortCutType,
            handleClick: ()=>navigate(`${pages.projContractPreview}?projId=${passedProjId}`),
          },
          {
            type: 'project' as ShortCutType,
            handleClick: ()=>navigate(`${pages.projEdit}?projId=${passedProjId}`),
          },
          {
            type: 'prospect' as ShortCutType,
            handleClick: ()=>navigate(`${pages.projProspect}?projId=${passedProjId}`),
          },
        ] : []),

        {
          type: 'delete',
          handleClick: ()=>setDialogState({ title: '確認', content: '削除しますか。', handleYes:  handleDelete }),
        },

      ]}
    />
  );
};
