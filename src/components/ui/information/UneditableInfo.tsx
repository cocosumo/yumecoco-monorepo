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
          <AlertTitle>修正出来ません</AlertTitle>
          契約書は「送信済み」状態なので、修正が出来ません。
          <br/>
          契約を「無効」ににすれば、修正出来ます。
          <br/>
          契約は「完了」状態になったら、「無効化」出来ないので、注意してください。
          <br/>
          {projId &&
          <Button
            onClick={()=>navigate(`${pages.projContractPreview}?projId=${projId}`)}
            color="inherit"
            variant={'outlined'}
            size="small">
            契約を見る
          </Button>
        }
        </Alert>
      </Grid>
    </Zoom>
  );
};