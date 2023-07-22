import { useFormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Shortcuts } from '../../../components/ui/speedDials/Shortcuts';
import { generateParams, getParams } from '../../../helpers/url';
import { pages } from '../../Router';
import { TypeOfForm } from '../form';

export const ProjectShortCuts = () => {
  const { values: { custGroupId, projId } } = useFormikContext<TypeOfForm>();
  const navigate = useNavigate();

  const urlParams = generateParams({
    ...getParams(),
    projId: projId,
    custGroupId: custGroupId,
  });

  return (
    <Shortcuts
      shortcuts={[
        {
          type: 'custGroup',
          handleClick: ()=>navigate(`${pages.custGroupEditV2}?${urlParams}`),
        },
        {
          type: 'prospect',
          handleClick: ()=>navigate(`${pages.projProspect}?${urlParams}`),
        },
        {
          type: 'estimate',
          handleClick: ()=>navigate(`${pages.projEstimate}?${urlParams}`),
        },
        {
          type: 'contract',
          handleClick: ()=>navigate(`${pages.projContractPreviewV2}?${urlParams}`),
        },
      ]}
    />);
};