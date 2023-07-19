import { Button } from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';

export const RelatedContracts = () => {
  return (
    <Button
      variant='outlined'
      color='primary'
      startIcon={<GavelIcon />}
    >
      関連契約
    </Button>
  );
};