import { Alert, AlertTitle, Button, Grid, Zoom } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../../pages/Router';

export const UneditableInfo = ({
  projId, isVisible,
}: {
  projId?: string
  isVisible: boolean,
}) => {
  const navigate = useNavigate();
  return (
    <Zoom in={isVisible} unmountOnExit={true}>


      <Grid item xs={12} >

        <Alert
          severity="warning"

        >
          <AlertTitle>
            編集出来ません
          </AlertTitle>
          契約書は「送信済み」です。
          <br />
          編集する場合は、契約を「無効」にしてください。
          <br />
          契約は「完了」状態になると「無効」にできないため、ご注意ください。
          <br />
          {projId &&
          <Button
            onClick={()=>navigate(`${pages.projContractPreview}?projId=${projId}`)}
            color="inherit"
            variant={'outlined'}
            size="small"
          >
            契約を見る
          </Button>}
        </Alert>
      </Grid>
    </Zoom>
  );
};