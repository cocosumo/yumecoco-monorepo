import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../Router';
import { generateParams } from '../../../helpers/url';
import { useFormContext, useFormState, useWatch } from 'react-hook-form';
import { TForm } from '../schema';


export const GoToContractButton = () => {

  const navigate = useNavigate();
  const { control, getValues } = useFormContext<TForm>();

  const { isDirty } = useFormState();


  const estimateId = useWatch({
    name: 'estimateId',
    control,
  });

  const isEnabled = estimateId && !isDirty;


  const handleGoToContractPage = () => {
   

    navigate(`${pages.projContractPreviewV2}?${generateParams({
      projId: getValues('projId'),
      custGroupId: getValues('custGroupId'),
      projEstimateId: getValues('estimateId'),
    })}`);
  };

  return (
    <Button
      variant={'contained'}
      disabled={!isEnabled}
      onClick={handleGoToContractPage}
    >
      契約作成
    </Button>

  );
};