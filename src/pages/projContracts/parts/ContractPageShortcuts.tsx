import { useFormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';
import { TypeOfForm } from '..';
import { Shortcuts } from '../../../components/ui/speedDials/Shortcuts';
import { generateParams } from '../../../helpers/url';
import { pages } from '../../Router';

export const ContractPageShortcuts = () => {
  const { values: {
    projId,
    custGroupId,
    projEstimateId,
  } } = useFormikContext<TypeOfForm>();
  const navigate = useNavigate();

  return (

    <Shortcuts
      shortcuts={[
        {
          type: 'project',
          handleClick: ()=>navigate(`${pages.projEdit}?${generateParams({
            projId,
          })}`),
        },
        {
          type: 'custGroup',
          handleClick: ()=>navigate(`${pages.custGroupEdit}?${generateParams({
            projId, custGroupId,
          })}`),
        },
        {
          type: 'prospect',
          handleClick: ()=>navigate(`${pages.projProspect}?${generateParams({
            projId,
          })}`),
        },
        {
          type: 'estimate',
          handleClick: ()=>navigate(`${pages.projEstimate}?${generateParams({
            projId, projEstimateId,
          })}`),
        },
      ]}
    />
  );
};