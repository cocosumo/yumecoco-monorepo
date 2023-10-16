import { Button } from '@mui/material';
import { useNavigateWithQuery } from 'kokoas-client/src/hooks';
import { useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../../schema';

export const ResetButton = () => {
  const {
    reset,
  } = useFormContext<TypeOfForm>();
  const navigate = useNavigateWithQuery();

  return (
    <Button
      onClick={() => {
        reset();
        navigate('projSearch');
      }}
      sx={{
        whiteSpace: 'nowrap',
      }}
    >
      リセット
    </Button>);
};