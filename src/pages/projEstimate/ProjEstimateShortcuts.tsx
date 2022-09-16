import { useFormikContext } from 'formik';
import { ComponentProps } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shortcuts } from '../../components/ui/speedDials/Shortcuts';
import { generateParams } from '../../helpers/url';
import { pages } from '../Router';
import { TypeOfForm } from './form';

type TShortCuts = ComponentProps<typeof Shortcuts>['shortcuts'];

export const ProjEstimateShortcuts = () => {
  const { values: {
    projId,
  } } = useFormikContext<TypeOfForm>();

  const navigate = useNavigate();

  let shortcuts : TShortCuts = [];
  if (projId) {
    shortcuts = [
      {
        type: 'project',
        handleClick: ()=>navigate(`${pages.projEdit}?${generateParams({ projId })}`),
      },
      {
        type: 'prospect',
        handleClick: ()=>navigate(`${pages.projProspect}?${generateParams({ projId })}`),
      },
    ];
  }


  return (

    <Shortcuts
      shortcuts={shortcuts}
    />

  );
};