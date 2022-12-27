import { Button, FormHelperText, Box } from '@mui/material';
import { TypeOfForm } from '../form';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../Router';
import { generateParams } from '../../../helpers/url';
import { useFormContext, useWatch } from 'react-hook-form';


export const GoToContractButton = () => {

  const navigate = useNavigate();
  const { control, formState } = useFormContext<TypeOfForm>();
  const {
    isDirty,
  } = formState;

  const [
    projId,
    estimateId,
    custGroupId,
  ] = useWatch({
    name: ['estimateId', 'custGroupId', 'projId'],
    control,
  });

  const isEnabled = estimateId && !isDirty;


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