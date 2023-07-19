import { Button } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

export const RelatedProjButton = ({
  disabled,
}:{
  disabled?: boolean,
}) => {
  return (
    <Button
      variant='outlined'
      color='primary'
      startIcon={<ConstructionIcon />}
      disabled={disabled}
    >
      関連案件
    </Button>
  );
};