import { useStableNavigate } from 'kokoas-client/src/hooks/useStableNavigate';
import { ComponentProps, useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Shortcuts, ShortCutType } from '../../../components/ui/speedDials/Shortcuts';
import { generateParams } from '../../../helpers/url';
import { pages } from '../../Router';
import { TForm } from '../schema';


export const ProjEstimateShortcuts = () => {

  const { getValues } = useFormContext<TForm>();

  const navigate = useStableNavigate();

  const navigateToPage = useCallback(() => {
    const [
      projId,
      projEstimateId,
      custGroupId,
    ] = getValues(['projId', 'estimateId', 'custGroupId' ]);
    navigate(`${pages.custGroupEditV2}?${generateParams({ 
      projId, 
      custGroupId: custGroupId,
      projEstimateId: projEstimateId || '' })}`);
  }, [navigate, getValues]);

  const shortcuts : ComponentProps<typeof Shortcuts>['shortcuts'] = useMemo(() => {
    return ['project', 'prospect', 'custGroup']
      .map((p) => ({
        type: p as ShortCutType,
        handleClick: navigateToPage,
      }));
  }, [navigateToPage]);


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