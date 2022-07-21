import { useFormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';
import { TypeOfForm } from '..';
import { Shortcuts } from '../../../../components/ui/speedDials/Shortcuts';
import { pages } from '../../../Router';

export const ProspectShortcuts = () => {
  const { values: {
    projId,
  } } = useFormikContext<TypeOfForm>();
  const navigate = useNavigate();

  return (
    <>
      {projId &&
      <Shortcuts
        shortcuts={[{
          type: 'project',
          handleClick: ()=>navigate(`${pages.projEdit}?projId=${projId}`),
        }]}

      />
      }
    </>
  );
};