import { useFormikContext } from 'formik';
import { ComponentProps } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shortcuts } from '../../../components/ui/speedDials/Shortcuts';
import { generateParams } from '../../../helpers/url';
import { pages } from '../../Router';
import { TypeOfForm } from '../form';


export const ProjEstimateShortcuts = () => {
  const {
    values: {
      projId,
      custGroupId,
      estimateId: projEstimateId,
    },
  } = useFormikContext<TypeOfForm>();

  const navigate = useNavigate();

  const shortcuts : ComponentProps<typeof Shortcuts>['shortcuts'] = [
    {
      type: 'project',
      handleClick: ()=>navigate(`${pages.projEdit}?${generateParams({ projId, projEstimateId })}`),
    },
    {
      type: 'prospect',
      handleClick: ()=>navigate(`${pages.projProspect}?${generateParams({ projId, projEstimateId })}`),
    },
    {
      type: 'custGroup',
      handleClick: ()=>navigate(`${pages.custGroupEdit}?${generateParams({ custGroupId, projId, projEstimateId })}`),
    },
  ];


  return (

    <Shortcuts
      shortcuts={shortcuts}
      speedDialProps={{
        direction: 'left',
        FabProps: {
          size: 'small',
        },
        sx: (theme) => ({
          position: 'relative',
          zIndex: theme.zIndex.snackbar + 1000,
        }),
      }}
      speedDialActionProps={{
        tooltipOpen: false,
      }}
    />

  );
};