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


  const [
    estimateId,
    hasOnProcessContract,
  ] = useWatch({
    name: [
      'estimateId',
      'hasOnProcessContract',
    ],
    control,
  });

  const isEnabled = estimateId && !isDirty && !hasOnProcessContract;


  const handleGoToContractPage = () => {
   

    navigate(`${pages.projContractPreviewV2}?${generateParams({
      projId: getValues('projId'),
      custGroupId: getValues('custGroupId'),
      projEstimateId: getValues('estimateId'),
    })}`);
  };

  return (
    <Button
      variant={'outlined'}
      disabled={!isEnabled}
      onClick={handleGoToContractPage}
    >
      契約作成
    </Button>

  );
};