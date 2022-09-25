import { useFormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';
import { TypeOfProjForm } from '..';
import { Shortcuts } from '../../../components/ui/speedDials/Shortcuts';
import { generateParams, getParams } from '../../../helpers/url';
import { pages } from '../../Router';

export const ProjectShortCuts = () => {
  const { values: { custGroupId, recordId } } = useFormikContext<TypeOfProjForm>();
  const navigate = useNavigate();

  const urlParams = generateParams({
    ...getParams(),
    projId: recordId,
    custGroupId: custGroupId,
  });

  return (
    <Shortcuts
      shortcuts={[
        {
          type: 'custGroup',
          handleClick: ()=>navigate(`${pages.custGroupEdit}?${urlParams}`),
        },
        {
          type: 'prospect',
          handleClick: ()=>navigate(`${pages.projProspect}?${urlParams}`),
        },
        {
          type: 'estimate',
          handleClick: ()=>navigate(`${pages.projEstimate}?${urlParams}`),
        },
      ]}
    />);
};