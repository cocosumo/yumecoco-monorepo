import { Alert, AlertTitle, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { generateParams } from '../../../../helpers/url';
import { pages } from '../../../Router';

export const ErrorNoEstimates = ({
  projId,
}: {
  projId: string
}) => {

  const navigate = useNavigate();

  return (
    <Alert
      severity='info'
      action={
        <Button
          onClick={() => navigate(`${pages.projEstimate}?${generateParams({ projId })}`)}
          size='large'
          color="inherit"
          variant="outlined"
        >
          見積登録
        </Button>
          }
    >
      <AlertTitle>
        見積は未ありません。
      </AlertTitle>
      契約を作成するのに、見積もりが必要です。右のボタンで新規登録出来ます。
    </Alert>
  );
};