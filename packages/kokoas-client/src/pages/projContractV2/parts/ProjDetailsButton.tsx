import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../schema';

export const ProjDetailsButton = () => {
  const navigate = useNavigate();
  const { watch } = useFormContext<TypeOfForm>();

  const projId = watch('projId');

  return (
    <Button
      variant='outlined'
      onClick={() => navigate(`${pages.projEdit}?${generateParams({ projId })}`)}
    >
      工事情報の詳細
    </Button>
  );
};