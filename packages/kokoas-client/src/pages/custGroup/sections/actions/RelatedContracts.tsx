import { Button } from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';

export const RelatedContracts = ({
  disabled,
}:{
  disabled?: boolean,
}) => {
  return (
    <Button
      variant='outlined'
      color='primary'
      startIcon={<GavelIcon />}
      disabled={disabled}
    >
      関連契約
    </Button>
  );
};