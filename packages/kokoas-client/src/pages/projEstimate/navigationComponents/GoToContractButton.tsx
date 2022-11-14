import { Button, FormHelperText, Box } from '@mui/material';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../form';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../Router';
import { generateParams } from '../../../helpers/url';
import isEmpty from 'lodash/isEmpty';


export const GoToContractButton = () => {

  const navigate = useNavigate();

  const {
    values: {
      estimateId,
      projId,
      custGroupId,
    },
    touched,
  } = useFormikContext<TypeOfForm>();

  const isEnabled = estimateId && isEmpty(touched);

  const handleGoToContractPage = () => {
    navigate(`${pages.projContractPreview}?${generateParams({
      projId,
      custGroupId,
      projEstimateId: estimateId,
    })}`);
  };

  return (

    <Box width={'100%'} justifyContent={'center'} display="flex">
      <div>
        <Button
          variant={'contained'}
          disabled={!isEnabled}
          sx={{
            minHeight: '40px',
            minWidth: '200px',
          }}
          onClick={handleGoToContractPage}
        >
          契約画面へいく
        </Button>

        {!isEnabled &&
        <FormHelperText>
          {!estimateId ? '保存してください。' : '保存されていない変更があります。' }
        </FormHelperText>}
      </div>
    </Box>
  );
};