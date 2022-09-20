import { Button, FormHelperText } from '@mui/material';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../form';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../Router';
import { generateParams } from '../../../helpers/url';

export const GoToContractButton = () => {

  const navigate = useNavigate();

  const {
    dirty,
    values: {
      estimateId,
      projId,
      custGroupId,
    },
  } = useFormikContext<TypeOfForm>();

  const isEnabled = estimateId && !dirty;

  const handleGoToContractPage = () => {
    navigate(`${pages.projContractPreview}?${generateParams({
      projId,
      custGroupId,
      projEstimateId: estimateId,
    })}`);
  };

  return (


    <div>
      <Button
        variant={'contained'}
        disabled={!isEnabled}
        sx={{ minHeight: '40px' }}
        onClick={handleGoToContractPage}
      >
        契約画面へいく
      </Button>

      {!isEnabled &&
        <FormHelperText>
          保存されていない変更があります。
        </FormHelperText>}
    </div>
  );
};