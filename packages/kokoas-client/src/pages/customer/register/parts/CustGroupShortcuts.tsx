

import { useNavigate } from 'react-router-dom';
import { useConfirmDialog } from '../../../../hooks';
import { pages } from '../../../Router';

import { Shortcuts, ShortCutType } from '../../../../components/ui/speedDials/Shortcuts';
import { useSoftDelCustGroupById } from 'kokoas-client/src/hooksQuery';
import { useURLParamsV2 } from 'kokoas-client/src/hooks/useURLParamsV2';
import { generateParams } from 'kokoas-client/src/helpers/url';


export  const  CustGroupShortcuts = (props : {
  custGroupId: string

}) => {
  const { setDialogState } = useConfirmDialog();
  const { mutate: softDelCustGroupById } = useSoftDelCustGroupById();
  const navigate = useNavigate();

  const params = useURLParamsV2();

  const { custGroupId } = props;

  const handleDelete = () => {
    softDelCustGroupById(custGroupId);
  };


  return (

    <Shortcuts
      shortcuts={[

        {
          type: 'contract' as ShortCutType,
          handleClick: ()=>navigate(`${pages.projContractPreviewV2}?${generateParams(params)}`),
        },
        {
          type: 'project' as ShortCutType,
          handleClick: ()=>navigate(`${pages.projEditV2}?${generateParams(params)}`),
        },
        {
          type: 'prospect' as ShortCutType,
          handleClick: ()=>navigate(`${pages.projProspect}?${generateParams(params)}`),
        },
     
        {
          type: 'delete',
          handleClick: ()=>setDialogState({ title: '確認', content: '削除しますか。', handleYes:  handleDelete }),
        },

      ]}
    />
  );
};
