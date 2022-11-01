import { Button, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { generateParams } from '../../../../helpers/url';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';

export const GoToOtherEditPage = ({
  route,
  tooltipTitle,
}:
{
  route: string,
  tooltipTitle: string
},
) => {
  const {
    values: {
      custGroupId,
      projId,
      projEstimateId,
    },
  } = useFormikContext<TypeOfForm>();
  const navigate = useNavigate();

  return (
    <Tooltip title={tooltipTitle}>
      <Button
        onClick={()=>navigate(`${route}?${generateParams({
          custGroupId,
          projId,
          projEstimateId,
        })}`)}
        size={'small'}
        color="secondary"
      >
        <EditIcon />
      </Button>
    </Tooltip>
  );
};