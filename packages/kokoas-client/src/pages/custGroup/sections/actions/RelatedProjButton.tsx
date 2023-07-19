import { Button } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

export const RelatedProjButton = () => {
  return (
    <Button
      variant='outlined'
      color='primary'
      startIcon={<ConstructionIcon />}

    >
      関連案件
    </Button>
  );
};