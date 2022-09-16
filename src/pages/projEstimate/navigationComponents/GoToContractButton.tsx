import { Button, FormHelperText, Stack } from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
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
    <Stack spacing={4} direction={'row'} justifyContent={'center'} >

      <Button
        variant={'contained'}
        color={'secondary'}
        sx={{ maxHeight: '40px' }}
      >
        <KeyboardDoubleArrowUpIcon />
      </Button>

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


    </Stack>
  );
};