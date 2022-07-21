import { useFormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';
import { TypeOfProjForm } from '..';
import { Shortcuts } from '../../../components/ui/speedDials/Shortcuts';
import { pages } from '../../Router';

export const ProjectShortCuts = () => {
  const { values: { custGroupId, recordId } } = useFormikContext<TypeOfProjForm>();
  const navigate = useNavigate();

  return (
    <Shortcuts
    shortcuts={[
      {
        type: 'custGroup',
        handleClick: ()=>navigate(`${pages.custGroupEdit}?groupId=${custGroupId}&projId=${recordId}`),
      },
      {
        type: 'prospect',
        handleClick: ()=>navigate(`${pages.projProspect}?projId=${recordId}`),
      },
      {
        type: 'contract',
        handleClick: ()=>navigate(`${pages.projContractPreview}?projId=${recordId}`),
      },
    ]}

  />);
};