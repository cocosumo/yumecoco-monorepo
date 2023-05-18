

import { useNavigate } from 'react-router-dom';
import { useQuery, useConfirmDialog } from '../../../../hooks';
import { pages } from '../../../Router';

import { Shortcuts, ShortCutType } from '../../../../components/ui/speedDials/Shortcuts';
import { useSoftDelCustGroupById } from 'kokoas-client/src/hooksQuery';


export  const  CustGroupShortcuts = (props : {
  custGroupId: string

}) => {
  const { setDialogState } = useConfirmDialog();
  const { mutate: softDelCustGroupById } = useSoftDelCustGroupById();
  const navigate = useNavigate();

  const passedProjId = useQuery().get('projId');
  const { custGroupId } = props;

  const handleDelete = () => {
    softDelCustGroupById(custGroupId);
  };


  return (

    <Shortcuts
      shortcuts={[

        ...(passedProjId ? [

          {
            type: 'contract' as ShortCutType,
            handleClick: ()=>navigate(`${pages.projContractPreviewV2}?projId=${passedProjId}`),
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
