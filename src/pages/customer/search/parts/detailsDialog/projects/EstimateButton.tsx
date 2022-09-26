import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { generateParams } from '../../../../../../helpers/url';
import { pages } from '../../../../../Router';
import EditIcon from '@mui/icons-material/Edit';

export const EstimateButton = ({
  projId,
  projEstimateId,
  isSmall = false,
}: {
  projId: string
  projEstimateId?: string,
  isSmall?: boolean
}) => {


  return (
    <Link to={`${pages.projEstimate}?${generateParams({ projId, projEstimateId, menuOpen: +false })}`} target="_blank" rel="noopener noreferrer" >
      <Button
        variant={isSmall ? 'text' : 'outlined'} fullWidth
        color='secondary'
        size={isSmall ? 'small' : 'large'}
        sx={isSmall ? {
          opacity:  0.2,
          '&:hover' : {
            opacity: 1,
          },
        } : undefined}
      >
        { isSmall ?  <EditIcon /> : '新規作成'}
      </Button>
    </Link>
  );
};